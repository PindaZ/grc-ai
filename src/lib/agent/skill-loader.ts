import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { AgentSkill } from './types';

export class FileSystemSkillLoader {
    private skillsDir: string;

    constructor(skillsDir?: string) {
        this.skillsDir = skillsDir || path.join(process.cwd(), 'skills');
    }

    async loadSkills(): Promise<AgentSkill[]> {
        const skills: AgentSkill[] = [];

        try {
            const items = await fs.readdir(this.skillsDir, { withFileTypes: true });

            for (const item of items) {
                if (item.isDirectory()) {
                    const skillPath = path.join(this.skillsDir, item.name);
                    const skill = await this.loadSkillFromDir(skillPath);
                    if (skill) {
                        skills.push(skill);
                    }
                }
            }
        } catch (error) {
            console.warn(`[SkillLoader] Could not load skills from ${this.skillsDir}:`, error);
            // Return empty array if skills dir doesn't exist
            return [];
        }

        return skills;
    }

    private async loadSkillFromDir(dirPath: string): Promise<AgentSkill | null> {
        const skillMdPath = path.join(dirPath, 'SKILL.md');

        try {
            const content = await fs.readFile(skillMdPath, 'utf-8');
            const parsed = this.parseSkillMd(content);

            if (parsed) {
                return {
                    ...parsed,
                    path: dirPath
                };
            }
        } catch (error) {
            // Silently fail if SKILL.md is missing or invalid, just log warning
            console.warn(`[SkillLoader] Error loading skill from ${dirPath}:`, error);
        }
        return null;
    }

    private parseSkillMd(content: string): Omit<AgentSkill, 'path'> | null {
        // Normalize line endings to \n for consistent regex matching
        const normalized = content.replace(/\r\n/g, '\n');

        // Split frontmatter and body
        // Typical format:
        // ---
        // key: value
        // ---
        // Body...

        const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (!match) {
            return null;
        }

        const frontmatterRaw = match[1];
        const instructions = match[2];

        try {
            const frontmatter = yaml.load(frontmatterRaw) as Record<string, any>;

            if (!frontmatter.name || !frontmatter.description) {
                console.warn('[SkillLoader] Skill missing name or description in frontmatter');
                return null;
            }

            return {
                name: frontmatter.name,
                description: frontmatter.description,
                instructions: instructions.trim()
            };
        } catch (e) {
            console.error('[SkillLoader] Error parsing YAML frontmatter:', e);
            return null;
        }
    }
}
