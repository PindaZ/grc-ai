'use client';

import {
    makeStyles,
    tokens,
    Input,
    Button,
    Text,
    Divider,
    Spinner
} from '@fluentui/react-components';
import {
    PersonRegular,
    LockClosedRegular,
    ArrowRightRegular
} from '@fluentui/react-icons';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: `radial-gradient(circle at 50% 0%, ${tokens.colorBrandBackground2} 0%, ${tokens.colorNeutralBackground1} 60%)`,
        padding: '24px',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    header: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '16px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    }
});

export default function SignInPage() {
    const styles = useStyles();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('demo@grc.ai');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials. Try demo@grc.ai / demo123');
                setIsLoading(false);
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError('An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '420px' }}
            >
                <GlassCard className={styles.card}>
                    <div className={styles.header}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackgroundPressed} 100%)`,
                            margin: '0 auto 16px auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            AI
                        </div>
                        <Text size={600} weight="bold" style={{ color: tokens.colorNeutralForeground1 }}>Welcome Back</Text>
                        <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>Sign in to access your GRC/AI workspace</Text>
                    </div>

                    <form onSubmit={handleSignIn} className={styles.form}>
                        {error && (
                            <div style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: tokens.colorPaletteRedBackground2,
                                color: tokens.colorPaletteRedForeground1,
                                fontSize: '13px',
                                textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <Text size={200} weight="semibold">Email Address</Text>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                contentBefore={<PersonRegular />}
                                placeholder="name@company.com"
                                size="large"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <Text size={200} weight="semibold">Password</Text>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                contentBefore={<LockClosedRegular />}
                                placeholder="••••••••"
                                size="large"
                            />
                        </div>

                        <Button
                            type="submit"
                            appearance="primary"
                            size="large"
                            icon={isLoading ? <Spinner size="tiny" /> : <ArrowRightRegular />}
                            disabled={isLoading}
                            style={{ marginTop: '8px' }}
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                        </Button>
                    </form>

                    <Divider>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>or continue with</Text>
                    </Divider>

                    <Button appearance="outline" size="large" onClick={() => alert('Google OAuth requires configuring GCP credentials. Use Demo login for now.')}>
                        Sign in with Google
                    </Button>
                </GlassCard>
            </motion.div>
        </div>
    );
}
