'use client';
import { useAppState } from '@/lib/providers/state-provider';
import { workspace } from '@/lib/supabase/supabase.types'
import { useEffect, useState } from 'react';
import SelectedWorkspace from './selected-workspace';
import CustomDialogTrigger from '../global/custom-dialog-trigger';

interface WorkspaceDropdownProps {
    privateWorkspaces: workspace[] | [];
    sharedWorkspaces: workspace[] | [];
    collaboratingWorkspaces: workspace[] | [];
    defaultValue: workspace | undefined;
}

const WorkspaceDropdown = ({ privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces, defaultValue }: WorkspaceDropdownProps) => {
    const { dispatch, state } = useAppState();
    const [selectedOption, setSelectedOption] = useState(defaultValue)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!state.workspaces.length) {
            dispatch({
                type: "SET_WORKSPACES",
                payload: {
                    workspaces: [
                        ...privateWorkspaces,
                        ...sharedWorkspaces,
                        ...collaboratingWorkspaces
                    ].map((workspace) => ({ ...workspace, folders: [] }))
                }
            });
        }
    }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces, dispatch, state.workspaces.length])

    const handleSelect = (option: workspace) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const findSelectedWorkspace = state.workspaces.find(
            (workspace) => workspace.id === defaultValue?.id
        );
        if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
    }, [state, defaultValue]);

    return (
        <div
            className='relative inline-block text-left'
        >
            <div>
                <span onClick={() => setIsOpen((prev) => !prev)} >
                    {selectedOption ? <SelectedWorkspace workspace={selectedOption} onClick={() => { }} /> : 'Select a workspace'}
                </span>
            </div >
            {
                isOpen && (<div
                    className="
                        origin-top-right
                        absolute
                        w-full
                        rounded-md
                        shadow-md
                        z-50
                        h-[190px]
                        bg-black/10
                        backdrop-blur-lg
                        group
                        overflow-scroll
                        border-[1px]
                        border-muted
                        
                    "
                >
                    <div className="flex flex-col rounded-md">
                        <div className="!p-2">
                            {!!privateWorkspaces.length && (
                                <>
                                    <p className="text-muted-foreground">Private</p>
                                    <hr></hr>
                                    {privateWorkspaces.map((option) => (
                                        <SelectedWorkspace
                                            key={option.id}
                                            workspace={option}
                                            onClick={handleSelect}
                                        />
                                    ))}
                                </>
                            )}
                            {!!sharedWorkspaces.length && (
                                <>
                                    <p className="text-muted-foreground">Shared</p>
                                    <hr />
                                    {sharedWorkspaces.map((option) => (
                                        <SelectedWorkspace
                                            key={option.id}
                                            workspace={option}
                                            onClick={handleSelect}
                                        />
                                    ))}
                                </>
                            )}
                            {!!collaboratingWorkspaces.length && (
                                <>
                                    <p className="text-muted-foreground">Collaborating</p>
                                    <hr />
                                    {collaboratingWorkspaces.map((option) => (
                                        <SelectedWorkspace
                                            key={option.id}
                                            workspace={option}
                                            onClick={handleSelect}
                                        />
                                    ))}
                                </>
                            )}
                        </div>


                        <CustomDialogTrigger
                            header="Create A Workspace"
                            // content={<WorkspaceCreator />}
                            description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
                        >
                            <div
                                className="flex items-center justify-center w-full gap-2 p-2 transition-all hover:bg-muted">
                                <article
                                    className="flex items-center justify-center w-4 h-4 rounded-full text-slate-500 bg-slate-800"
                                >
                                    +
                                </article>
                                Create workspace
                            </div>
                        </CustomDialogTrigger>

                    </div>
                </div>
                )}
        </div >
    )
}

export default WorkspaceDropdown