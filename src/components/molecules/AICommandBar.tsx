'use client';

import {
    makeStyles,
    tokens,
    SearchBox,
    Button,
    Popover,
    PopoverTrigger,
    PopoverSurface,
    Text,
    Persona,
    Divider,
    Avatar
} from '@fluentui/react-components';
import {
    SparkleRegular,
    HistoryRegular,
    LightbulbRegular,
    ArrowRightRegular
} from '@fluentui/react-icons';
import { useState, useRef } from 'react';

const useStyles = makeStyles({
    container: {
        width: '100%',
        maxWidth: '600px',
        position: 'relative',
    },
    searchBox: {
        width: '100%',
    },
    popoverSurface: {
        width: '600px',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
    },
    suggestionsContainer: {
        padding: tokens.spacingVerticalM,
    },
    suggestionGroup: {
        marginBottom: tokens.spacingVerticalM,
    },
    groupTitle: {
        padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
        color: tokens.colorNeutralForeground4,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalXS,
    },
    suggestionItem: {
        width: '100%',
        justifyContent: 'flex-start',
        padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
        },
        textAlign: 'left',
        fontWeight: 'normal',
    },
});

export function AICommandBar() {
    const styles = useStyles();
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = () => {
        setOpen(true);
    };

    // Mock suggestions
    const recentPrompts = [
        "Show me overdue controls",
        "Generate risk assessment for ISO 27001",
    ];

    const suggestedActions = [
        "Draft a compliance report",
        "Analyze evidence for Policy A",
        "Check status of new regulations",
    ];

    return (
        <div className={styles.container}>
            <Popover open={open} onOpenChange={(e, data) => setOpen(data.open)} positioning="below-start">
                <PopoverTrigger disableButtonEnhancement>
                    <SearchBox
                        ref={inputRef}
                        className={styles.searchBox}
                        placeholder="Ask AI or type a command..."
                        contentBefore={<SparkleRegular style={{ color: tokens.colorBrandForeground1 }} />}
                        size="large"
                        onFocus={handleFocus}
                    />
                </PopoverTrigger>
                <PopoverSurface className={styles.popoverSurface}>
                    <div className={styles.suggestionsContainer}>
                        {recentPrompts.length > 0 && (
                            <div className={styles.suggestionGroup}>
                                <div className={styles.groupTitle}><HistoryRegular fontSize={16} /> Recent</div>
                                {recentPrompts.map((prompt, i) => (
                                    <Button key={i} appearance="subtle" className={styles.suggestionItem} onClick={() => setOpen(false)}>
                                        {prompt}
                                    </Button>
                                ))}
                            </div>
                        )}

                        <div className={styles.suggestionGroup}>
                            <div className={styles.groupTitle}><LightbulbRegular fontSize={16} /> Suggestions</div>
                            {suggestedActions.map((action, i) => (
                                <Button key={i} appearance="subtle" className={styles.suggestionItem} onClick={() => setOpen(false)}>
                                    {action}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Divider />
                    <div style={{ padding: tokens.spacingVerticalS, backgroundColor: tokens.colorNeutralBackground2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: tokens.spacingHorizontalM, paddingRight: tokens.spacingHorizontalM }}>
                        <Text size={200} style={{ color: tokens.colorNeutralForeground4 }}>Press Enter to submit</Text>
                        <Button appearance="transparent" size="small" icon={<ArrowRightRegular />} />
                    </div>
                </PopoverSurface>
            </Popover>
        </div>
    );
}
