'use client';

import copy from 'copy-to-clipboard';
import { FiCheck, FiClipboard } from 'icons/fi';
import { cn } from 'lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyButtonProps {
    text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [clicked, setClicked] = useState(false);
    const clickCopy = () => {
        copy(text);
        toast.success('Code copied to clipboard');
        setClicked(true);
        setTimeout(() => setClicked(false), 2000);
    };

    return (
        <button
            className={cn(
                'absolute right-[28px] top-2.5 w-fit cursor-pointer text-base-400 opacity-0 transition-all duration-150 hover:!text-accent-500 group-hover:opacity-100',
            )}
            onClick={clickCopy}
        >
            <FiCheck
                size={18}
                className={cn(
                    'absolute inset-0 transition-all duration-150',
                    clicked ? 'text-emerald-500 opacity-100' : 'opacity-0',
                )}
            />
            <FiClipboard
                size={18}
                className={cn('absolute inset-0 transition-all duration-150', !clicked ? 'opacity-100' : 'opacity-0')}
            />
        </button>
    );
};

export default CopyButton;
