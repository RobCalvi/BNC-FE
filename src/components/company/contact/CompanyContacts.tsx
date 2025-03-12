import React, { useState } from 'react';
import Contact from '../../../models/contact/contact';
import ContactTile from './ContactTile';
import CompanyItemGrid, { CompanyGridItem } from '../shared/CompanyItemGrid';
import PrimaryActionArea from '../../common/PrimaryActionArea';
import CompanyAddContactModal from './CompanyAddContactModal';
import ConfirmActionDialog from '../../common/ConfirmActionDialog';
import useStatus from '../../../hooks/useStatus';
import { deleteCompanyContact } from '../../../api/contact';
import { v4 as uuidv4 } from 'uuid';

type CompanyContactsProps = {
    id: string;
    contacts: Contact[];
    handleUpdate: (nc: Contact[]) => void;
};

const CompanyContacts: React.FC<CompanyContactsProps> = ({ id, contacts, handleUpdate }) => {
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const { status, setLoading, setError, setSuccess } = useStatus();
    const [deleteId, setDeleteId] = useState<string>('');

    const handleEmailClick = (email: string) => window.location.href = `mailto:${email}`;
    const handlePhoneClick = (phone: string) => window.location.href = `tel:${phone}`;
    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setOpenDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            setSuccess(false);
            setError('');
            const results = await deleteCompanyContact(id, deleteId);
            handleUpdate(results);
            return setOpenDeleteModal(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PrimaryActionArea color="primary" onClick={() => setOpenAddModal(true)}>
            <CompanyItemGrid>
                {contacts.map(contact => (
                    <CompanyGridItem key={contact.id ?? uuidv4()}>
                        <ContactTile
                            companyId={id}
                            contact={contact}
                            handleUpdate={handleUpdate}
                            onEmailClick={handleEmailClick}
                            onPhoneClick={handlePhoneClick}
                            handleDeleteClick={() => handleDeleteClick(contact.id)}
                        />
                    </CompanyGridItem>
                ))}
            </CompanyItemGrid>
            <CompanyAddContactModal
                id={id}
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                handleUpdate={handleUpdate}
            />
            {
                openDeleteModal && (
                    <ConfirmActionDialog
                        open={openDeleteModal}
                        handleClose={() => setOpenDeleteModal(false)}
                        handleConfirm={handleDelete}
                        loading={status.loading}
                        error={status.error}
                        title="Confirm Deletion"
                    />
                )
            }
        </PrimaryActionArea>
    );
};

export default CompanyContacts;
