/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from 'zustand'
import { WorkspaceState, RootState, WorkSpace } from '../types'
import toast from 'react-hot-toast'
import { getRequestWithToken } from '@/components/utils/axios.request'

export const createWorkSpaceSlice: StateCreator<
	RootState,
	[],
	[],
	WorkspaceState
> = (set, get) => ({
	workspaces: [],
	fetchWorkspaces: async () => {
		try {
			const response = await getRequestWithToken<Array<WorkSpace>>('workspace/list')
			if (response.status === 200) {
				const workspaceData = response.data.data
				set(() => ({
					workspaces: workspaceData.map((workspace) => ({
						_id: workspace._id,
						name: workspace.name,
						owner: workspace.owner,
						members: workspace.members.map((member) => ({
							role: member.role,
							user: member.user
						})),
						uuid: workspace.uuid,	
						image: workspace.image || "",
						createdAt: new Date(workspace.createdAt),
						updatedAt: new Date(workspace.updatedAt)
					}))
                }))
			}
		} catch (error: any) {
			const status = error.response.status
			if ([404, 400].includes(status)) {
				toast.error(error.response.data.message)
			}
			else if (status === 401) {
				localStorage.removeItem('token')
			}
		}
	}
})