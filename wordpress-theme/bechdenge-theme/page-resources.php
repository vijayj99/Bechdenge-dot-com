<?php
/* Template Name: Resources Page */
get_header();
?>

<div class="section-padding container">
    <h1 style="text-align: center; margin-bottom: 1rem;">Free <span
            style="color: var(--color-accent-primary);">Resources</span></h1>
    <p style="text-align: center; max-width: 600px; margin: 0 auto 3rem auto; color: var(--color-text-secondary);">
        Download our free guides, templates, and checklists to help you master e-commerce.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
        <!-- Resource Card 1 -->
        <div class="resource-card"
            style="background: white; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div
                    style="width: 50px; height: 50px; background: var(--color-bg-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: var(--color-accent-primary);">
                    <i data-lucide="file-text" width="24"></i>
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Amazon PPC Audit Checklist</h3>
                <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
                    A comprehensive checklist to audit your PPC campaigns.
                </p>
            </div>
            <button class="btn btn-secondary open-modal-btn" data-resource-title="Amazon PPC Audit Checklist"
                data-resource-link="#"
                style="width: 100%; justify-content: center; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="download" width="16"></i> Download PDF
            </button>
        </div>

        <!-- Resource Card 2 -->
        <div class="resource-card"
            style="background: white; padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div
                    style="width: 50px; height: 50px; background: var(--color-bg-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: var(--color-accent-primary);">
                    <i data-lucide="file-text" width="24"></i>
                </div>
                <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Keyword Research Template</h3>
                <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem; font-size: 0.9rem;">
                    Excel template for organizing your keyword research.
                </p>
            </div>
            <button class="btn btn-secondary open-modal-btn" data-resource-title="Keyword Research Template"
                data-resource-link="#"
                style="width: 100%; justify-content: center; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="download" width="16"></i> Download Excel
            </button>
        </div>
    </div>

    <!-- Lead Capture Modal Structure (Hidden by default) -->
    <div id="resource-modal"
        style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 2000;">
        <div
            style="background: white; padding: 2rem; border-radius: var(--radius-md); width: 90%; max-width: 400px; position: relative;">
            <button id="close-modal-btn"
                style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>

            <h2 style="margin-bottom: 1rem; text-align: center;">Download Form</h2>
            <p style="margin-bottom: 1.5rem; text-align: center; color: #666; font-size: 0.9rem;">Please provide your
                details to access this resource.</p>

            <form id="lead-form">
                <input type="hidden" id="resource-target" value="">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 0.5rem;">Name</label>
                    <input required type="text" id="lead-name"
                        style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
                        placeholder="John Doe">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 0.5rem;">Email (Gmail
                        preferred)</label>
                    <input required type="email" id="lead-email"
                        style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
                        placeholder="example@gmail.com">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; font-size: 0.9rem; margin-bottom: 0.5rem;">Phone Number</label>
                    <input required type="tel" id="lead-phone"
                        style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
                        placeholder="+91 9876543210">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">
                    Access Download <i data-lucide="external-link" width="16"></i>
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const modal = document.getElementById('resource-modal');
        const closeBtn = document.getElementById('close-modal-btn');
        const leadForm = document.getElementById('lead-form');
        const resourceTarget = document.getElementById('resource-target');
        const btns = document.querySelectorAll('.open-modal-btn');

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Check session like React app
                if (sessionStorage.getItem('resourceUser')) {
                    window.open(btn.getAttribute('data-resource-link'), '_blank');
                } else {
                    resourceTarget.value = btn.getAttribute('data-resource-link');
                    modal.style.display = 'flex';
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('lead-name').value;
            const email = document.getElementById('lead-email').value;
            const phone = document.getElementById('lead-phone').value;

            // "Save" to session storge
            const formData = { name, email, phone };
            sessionStorage.setItem('resourceUser', JSON.stringify(formData));

            // Close and Download
            modal.style.display = 'none';
            window.open(resourceTarget.value, '_blank');

            // In a real WP site, you'd AJAX this data to the server here
            alert('Thank you! Your download is starting.');
        });
    });
</script>

<?php get_footer(); ?>