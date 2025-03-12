import React, { useState } from 'react'
import Action from '../../../models/actions/action'
import CompanyItemGrid from '../shared/CompanyItemGrid';
import Grid from '@mui/material/Grid';
import CompanyActionTile from './CompanyActionTile';
import CompanyAddActionDialog from './CompanyAddActionDialog';
import { useParams } from 'react-router-dom';
import PrimaryActionArea from '../../common/PrimaryActionArea';
import useStatus from '../../../hooks/useStatus';
import { deleteCompanyAction } from '../../../api/action';
import ConfirmActionDialog from '../../common/ConfirmActionDialog';
import CompanyReminderDialog from './CompanyReminderDialog';

type CompanyActionsProps = {
    actions: Action[];
    handleUpdate: (actions: Action[]) => void;
}

const CompanyActions: React.FC<CompanyActionsProps> = ({ actions, handleUpdate }) => {
    const { id } = useParams()
    const { status, setLoading, setSuccess, setError } = useStatus()
    const [openAddActionModal, setOpenAddActionModal] = useState<boolean>(false)
    const [openDeleteActionModal, setOpenDeleteActionModal] = useState<boolean>(false)
    const [openAddReminderModal, setOpenAddReminderModal] = useState<boolean>(false)
    const [actionId, setActionId] = useState<string | null>(null)
    const handleDeleteClick = (aid: string | null) => {
        setActionId(aid)
        setOpenDeleteActionModal(aid !== null)
    }
    const handleReminderClick = (aid: string | null) => {
        setActionId(aid)
        setOpenAddReminderModal(aid !== null)
    }
    const handleDelete = async () => {
        if (!id || !actionId) return;
        try {
            setLoading(true)
            setSuccess(false)
            setError('')
            const res = await deleteCompanyAction(id!, actionId)
            handleUpdate(res)
            setSuccess(true)
        } catch (err: any) {
            setError('Could not add action.')
        } finally {
            setLoading(false)
        }
        setOpenDeleteActionModal(false)
    }
    return (
        <PrimaryActionArea color="info" onClick={() => setOpenAddActionModal(true)}>
            <CompanyItemGrid>
                {actions.sort((a, b) => b.date > a.date ? -1 : 1).map(action => (
                    <Grid item xs={12} sm={6} md={10} key={action.id}>
                        <CompanyActionTile action={action} handleDeleteClick={handleDeleteClick} handleReminderClick={handleReminderClick} />
                    </Grid>
                ))}
            </CompanyItemGrid>
            { openAddActionModal && <CompanyAddActionDialog open={openAddActionModal} handleClose={() => setOpenAddActionModal(false)} handleSubmit={handleUpdate} /> }
            <ConfirmActionDialog
                open={openDeleteActionModal && actionId !== null}
                handleClose={() => setOpenDeleteActionModal(false)}
                handleConfirm={handleDelete}
                loading={status.loading}
                error={status.error}
            />
            { openAddReminderModal && actionId && 
                <CompanyReminderDialog 
                    open={openAddReminderModal} 
                    handleClose={() => setOpenAddReminderModal(false)} 
                    companyId={id!}
                    actionId={actionId!}
                /> 
            }
        </PrimaryActionArea>
    )
}

export default CompanyActions