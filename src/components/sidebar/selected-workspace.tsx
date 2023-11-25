'use client';
import { workspace } from "@/lib/supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface SelectedWorkspaceProps {
    workspace: workspace;
    onClick?: (option: workspace) => void;
}

const SelectedWorkspace = ({ workspace, onClick }: SelectedWorkspaceProps) => {

    const supabase = createClientComponentClient();
    const [workspaceLogo, setWorkspaceLogo] = useState('/cypresslogo.svg');

    useEffect(() => {
        if (workspace.logo) {
            const path = supabase.storage
                .from("workspace-logos")
                .getPublicUrl(workspace.logo)?.data.publicUrl;
            setWorkspaceLogo(path);
        }
    }, [workspace, supabase.storage]);

    return (
        <Link href={`/dashboard/${workspace.id}`}
            onClick={() => {
                if (onClick) onClick(workspace);
            }}
            className="flex flex-row items-center justify-center gap-4 p-2 my-2 transition-all rounded-md cursor-pointer hover:bg-muted"
        >
            <Image
                src={workspaceLogo}
                alt="workspace logo"
                width={26}
                height={26}
                objectFit="cover"
            />
            <div className="flex flex-col">
                <p
                    className="text-lg 
                        w-[170px] 
                        overflow-hidden 
                        overflow-ellipsis 
                        whitespace-nowrap
                    "
                >
                    {workspace.title}
                </p>
            </div>
        </Link>
    )
}

export default SelectedWorkspace