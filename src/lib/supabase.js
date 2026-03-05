import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate credentials
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Supabase credentials missing! Please check your .env file.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========================================
// TEAM MEMBERS DATABASE OPERATIONS
// ========================================

/**
 * Fetch all team members from database
 * @returns {Promise<Array>} Array of team member objects
 */
export const getTeamMembers = async () => {
    try {
        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error fetching team members:', error);
        return [];
    }
};

/**
 * Add a new team member to database
 * @param {Object} member - Team member data
 * @returns {Promise<Object>} Created team member
 */
export const addTeamMember = async (member) => {
    try {
        const { data, error } = await supabase
            .from('team_members')
            .insert([member])
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error adding team member:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Update an existing team member
 * @param {string} id - Team member ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated team member
 */
export const updateTeamMember = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('team_members')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error updating team member:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Delete a team member from database
 * @param {string} id - Team member ID
 * @returns {Promise<Object>} Success status
 */
export const deleteTeamMember = async (id) => {
    try {
        const { error } = await supabase
            .from('team_members')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error deleting team member:', error);
        return { success: false, error: error.message };
    }
};

// ========================================
// IMAGE UPLOAD TO SUPABASE STORAGE
// ========================================

/**
 * Upload image to Supabase Storage
 * @param {File} file - Image file to upload
 * @param {string} folder - Storage folder (default: 'team-images')
 * @returns {Promise<Object>} Public URL of uploaded image
 */
export const uploadImage = async (file, folder = 'team-images') => {
    try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('team-images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('team-images')
            .getPublicUrl(filePath);

        return { success: true, url: publicUrl };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Delete image from Supabase Storage
 * @param {string} imageUrl - Full URL of the image
 * @returns {Promise<Object>} Success status
 */
export const deleteImage = async (imageUrl) => {
    try {
        // Extract file path from URL
        const urlParts = imageUrl.split('/team-images/');
        if (urlParts.length < 2) throw new Error('Invalid image URL');

        const filePath = `team-images/${urlParts[1]}`;

        const { error } = await supabase.storage
            .from('team-images')
            .remove([filePath]);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error deleting image:', error);
        return { success: false, error: error.message };
    }
};
