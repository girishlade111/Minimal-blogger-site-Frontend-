import React, { useState } from 'react';

// Fix: Corrected malformed viewBox attribute and ensured all SVG properties are valid strings.
const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);

// Fix: Corrected malformed viewBox attribute and ensured all SVG properties are valid strings.
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

interface CodeSnippetProps {
    language: string;
    code: string;
}

const highlightSyntax = (code: string, language: string): string => {
    let highlightedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // This is a basic highlighter and not comprehensive.
    // It is designed to be simple and avoid heavy dependencies.
    const rules: { [lang: string]: [RegExp, string][] } = {
        javascript: [
            [/\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|new|class|extends|super)\b/g, 'token-keyword'],
            [/('.*?'|".*?"|`.*?`)/g, 'token-string'],
            [/(\/\/.*|\/\*[\s\S]*?\*\/)/g, 'token-comment'],
            [/\b(\d+)\b/g, 'token-number'],
            [/([A-Z][a-zA-Z]*)/g, 'token-class-name'],
            [/(\{|\}|\(|\)|\[|\])/g, 'token-punctuation'],
        ],
        tsx: [
            [/\b(const|let|var|function|return|if|else|for|while|import|export|from|async|await|new|class|extends|super|React|FC|useState|useEffect)\b/g, 'token-keyword'],
            [/(&lt;\/?)(\w+)/g, '$1<span class="token-tag-name">$2</span>'],
            [/('.*?'|".*?"|`.*?`)/g, 'token-string'],
            [/(\/\/.*|\/\*[\s\S]*?\*\/)/g, 'token-comment'],
            [/\b(\d+)\b/g, 'token-number'],
            [/([A-Z][a-zA-Z]*)/g, 'token-class-name'],
            [/(\{|\}|\(|\)|\[|\])/g, 'token-punctuation'],
        ],
        css: [
            [/(#[a-zA-Z0-9_-]+|\.[a-zA-Z0-9_-]+)/g, 'token-selector'],
            [/([\w-]+)\s*:/g, '<span class="token-property">$1</span>:'],
            [/(\d+)(px|em|rem|%|vh|vw)/g, '<span class="token-number">$1</span><span class="token-unit">$2</span>'],
            [/(\/\*[\s\S]*?\*\/)/g, 'token-comment'],
        ],
    };

    const langRules = rules[language.toLowerCase()] || rules['javascript'];

    langRules.forEach(([regex, className]) => {
        highlightedCode = highlightedCode.replace(regex, `<span class="${className}">$1</span>`);
    });

    return highlightedCode;
};


export const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code }) => {
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = async () => {
        if (isCopied) return;
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const highlightedCode = highlightSyntax(code, language);

    return (
        <div className="my-6 rounded-lg border bg-secondary/50 overflow-hidden not-prose">
            <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={isCopied ? "Code copied" : "Copy code to clipboard"}
                >
                    {isCopied ? (
                        <>
                            <CheckIcon className="h-4 w-4 text-green-500" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <CopyIcon className="h-4 w-4" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
                <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
        </div>
    );
};
