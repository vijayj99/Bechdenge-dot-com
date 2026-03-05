import React, { useState, useEffect } from 'react';
import { Users, Edit, Trash, Plus, Upload, X } from 'lucide-react';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember, uploadImage, deleteImage } from '../lib/supabase';

const TeamManagementTab = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showForm, setShowForm] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        role: '',
        bio: '',
        image_url: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        setLoading(true);
        const data = await getTeamMembers();
        setTeamMembers(data);
        setLoading(false);
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: '❌ Image size must be less than 5MB' });
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            let imageUrl = formData.image_url;

            // Upload image if selected
            if (imageFile) {
                setUploading(true);
                const uploadResult = await uploadImage(imageFile);
                setUploading(false);

                if (!uploadResult.success) {
                    throw new Error(uploadResult.error);
                }
                imageUrl = uploadResult.url;

                // Delete old image if updating
                if (formData.id && formData.image_url && !formData.image_url.includes('placeholder') && !formData.image_url.includes('ui-avatars')) {
                    await deleteImage(formData.image_url);
                }
            }

            const memberData = {
                name: formData.name,
                role: formData.role,
                bio: formData.bio,
                image_url: imageUrl
            };

            let result;
            if (formData.id) {
                // Update existing member
                result = await updateTeamMember(formData.id, memberData);
                setMessage({ type: 'success', text: '✅ Team member updated successfully!' });
            } else {
                // Add new member
                result = await addTeamMember(memberData);
                setMessage({ type: 'success', text: '✅ Team member added successfully!' });
            }

            if (result.success) {
                // Reset form
                resetForm();
                fetchTeamMembers();
                setShowForm(false);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setMessage({ type: 'error', text: `❌ Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            id: member.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            image_url: member.image_url
        });
        setImagePreview(member.image_url);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id, imageUrl) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        setLoading(true);
        try {
            const result = await deleteTeamMember(id);
            if (result.success) {
                // Delete associated image
                if (imageUrl && !imageUrl.includes('placeholder') && !imageUrl.includes('ui-avatars')) {
                    await deleteImage(imageUrl);
                }
                setMessage({ type: 'success', text: '✅ Team member deleted successfully!' });
                fetchTeamMembers();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setMessage({ type: 'error', text: `❌ Error: ${error.message}` });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ id: null, name: '', role: '', bio: '', image_url: '' });
        setImageFile(null);
        setImagePreview('');
    };

    const handleCancel = () => {
        resetForm();
        setShowForm(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: '1 1 250px' }}>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: 'white', marginBottom: '0.5rem' }}>Manage Team</h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                        Add or edit team members with Supabase cloud storage
                    </p>
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        resetForm();
                        setShowForm(!showForm);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    {showForm ? 'Cancel' : 'Add Member'}
                </button>
            </div>

            {/* Message Display */}
            {message.text && (
                <div style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '8px',
                    background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                    border: `1px solid ${message.type === 'error' ? '#ef4444' : '#10b981'}`,
                    color: message.type === 'error' ? '#ef4444' : '#10b981',
                    textAlign: 'center'
                }}>
                    {message.text}
                </div>
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <div style={{
                    padding: '2rem',
                    marginBottom: '3rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'white' }}>
                        {formData.id ? '✏️ Edit Team Member' : '➕ Add New Team Member'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: 'white',
                                        fontSize: '0.95rem'
                                    }}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    Role/Position *
                                </label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: 'white',
                                        fontSize: '0.95rem'
                                    }}
                                    placeholder="Marketing Manager"
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                Bio/Description *
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: 'white',
                                    resize: 'vertical',
                                    fontSize: '0.95rem'
                                }}
                                placeholder="Brief description about the team member..."
                                required
                            ></textarea>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                Profile Image {!formData.id && '*'} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(Max 5MB)</span>
                            </label>
                            <div style={{
                                border: '2px dashed rgba(255,255,255,0.2)',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                textAlign: 'center',
                                background: 'rgba(0,0,0,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file) handleImageSelect({ target: { files: [file] } });
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    style={{ display: 'none' }}
                                    id="imageUpload"
                                />
                                <label htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'block' }}>
                                    {imagePreview ? (
                                        <div>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '3px solid var(--color-primary)',
                                                    margin: '0 auto 1rem'
                                                }}
                                            />
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                                                Click or drag to change image
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <Upload size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem' }} />
                                            <p style={{ color: 'white', marginBottom: '0.5rem' }}>Click to upload or drag and drop</p>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                                                PNG, JPG, WebP (Max 5MB)
                                            </p>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="submit"
                                className="cta-button"
                                disabled={loading || uploading}
                                style={{
                                    flex: 1,
                                    padding: '0.85rem',
                                    fontSize: '1rem',
                                    opacity: loading || uploading ? 0.5 : 1,
                                    cursor: loading || uploading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading || uploading ? (formData.id ? 'Updating...' : 'Adding...') : (formData.id ? '✅ Update Member' : '➕ Add Member')}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                style={{
                                    flex: 1,
                                    padding: '0.85rem',
                                    fontSize: '1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Team Members List */}
            <div>
                <h3 style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                    marginBottom: '1.5rem',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                }}>
                    <Users size={24} /> Current Team Members ({teamMembers.length})
                </h3>
                {loading && teamMembers.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '3rem' }}>
                        Loading team members...
                    </p>
                ) : teamMembers.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border)'
                    }}>
                        <Users size={60} style={{ color: 'var(--color-primary)', opacity: 0.3, margin: '0 auto 1rem' }} />
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                            No team members yet. Add your first member above!
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
                        gap: '1.5rem'
                    }}>
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '2rem',
                                    border: '1px solid var(--color-border)',
                                    textAlign: 'center',
                                    position: 'relative',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ position: 'absolute', top: 15, right: 15, display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleEdit(member)}
                                        style={{
                                            color: 'white',
                                            background: 'rgba(59, 130, 246, 0.2)',
                                            border: '1px solid #3b82f6',
                                            borderRadius: '6px',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Edit"
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id, member.image_url)}
                                        style={{
                                            color: '#ef4444',
                                            background: 'rgba(239, 68, 68, 0.2)',
                                            border: '1px solid #ef4444',
                                            borderRadius: '6px',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        title="Delete"
                                    >
                                        <Trash size={14} />
                                    </button>
                                </div>
                                <img
                                    src={member.image_url}
                                    alt={member.name}
                                    style={{
                                        width: '90px',
                                        height: '90px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginBottom: '1.25rem',
                                        border: '2px solid var(--color-primary)',
                                        padding: '3px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                    }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=ec4899&color=fff&bold=true&format=svg`;
                                    }}
                                />
                                <h4 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.4rem', paddingRight: '3rem' }}>{member.name}</h4>
                                <p style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.role}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamManagementTab;
