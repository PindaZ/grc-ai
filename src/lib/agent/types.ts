
export interface AgentSkill {
    name: string;
    description: string;
    instructions: string;
    path: string;
}

export interface SkillLoader {
    loadSkills(): Promise<AgentSkill[]>;
    getSkill(name: string): Promise<AgentSkill | null>;
}
