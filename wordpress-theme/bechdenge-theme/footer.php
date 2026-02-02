<footer
    style="background-color: #232f3e; color: white; padding: 4rem 0 0 0; margin-top: auto; position: relative; z-index: 10;">
    <div class="container"
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding-bottom: 3rem;">

        <!-- Contact Info -->
        <div>
            <h3 style="color: #ff9900; marginBottom: 1.5rem;">Contact Details</h3>
            <ul style="display: flex; flexDirection: column; gap: 1rem;">
                <li style="display: flex; alignItems: center; gap: 0.75rem;">
                    <i data-lucide="user" color="#ff9900" width="18"></i>
                    <span>Vijay Savani</span>
                </li>
                <li style="display: flex; alignItems: center; gap: 0.75rem;">
                    <i data-lucide="mail" color="#ff9900" width="18"></i>
                    <a href="mailto:contact@bechdenge.com"
                        style="text-decoration: none; color: white;">contact@bechdenge.com</a>
                </li>
                <li style="display: flex; alignItems: center; gap: 0.75rem;">
                    <i data-lucide="phone" color="#ff9900" width="18"></i>
                    <a href="tel:+919265141412" style="text-decoration: none; color: white;">+91 92651 41412</a>
                </li>
            </ul>
        </div>

        <!-- Social Links -->
        <div>
            <h3 style="color: #ff9900; marginBottom: 1.5rem;">Connect With Us</h3>
            <div style="display: flex; gap: 1rem;">
                <a href="https://www.linkedin.com/in/vijay-savani-7b94111b5/" target="_blank" rel="noopener noreferrer"
                    style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 50%; display: flex; alignItems: center; justify-content: center;">
                    <i data-lucide="linkedin" color="white" width="20"></i>
                </a>
                <a href="https://wa.me/+919265141412" target="_blank" rel="noopener noreferrer"
                    style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 50%; display: flex; alignItems: center; justify-content: center;">
                    <i data-lucide="message-circle" color="white" width="20"></i>
                </a>
                <a href="https://www.instagram.com/vijaysavani_champion/" target="_blank" rel="noopener noreferrer"
                    style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 50%; display: flex; alignItems: center; justify-content: center;">
                    <i data-lucide="instagram" color="white" width="20"></i>
                </a>
                <a href="https://www.facebook.com/drvijay.patel99/" target="_blank" rel="noopener noreferrer"
                    style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 50%; display: flex; alignItems: center; justify-content: center;">
                    <i data-lucide="facebook" color="white" width="20"></i>
                </a>
            </div>
        </div>

        <!-- Quick Links -->
        <div>
            <h3 style="color: #ff9900; marginBottom: 1.5rem;">Quick Links</h3>
            <?php
            wp_nav_menu(array(
                'theme_location' => 'footer-menu',
                'container' => false,
                'menu_class' => 'footer-links-list', // You would style this class in style.css to match flex-col
                'fallback_cb' => false,
            ));
            ?>
            <!-- Fallback static links if menu empty -->
            <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                <li><a href="/services" style="text-decoration: none; color: white;">Services</a></li>
                <li><a href="/gallery" style="text-decoration: none; color: white;">Photo Gallery</a></li>
            </ul>
        </div>
    </div>

    <!-- Separator Line -->
    <div style="width: 100%; height: 1px; background: rgba(255,255,255,0.1);"></div>

    <!-- Copyright -->
    <div style="text-align: center; padding: 2rem 1rem; font-size: 0.9rem; color: #ccc;">
        <p>&copy;
            <?php echo date('Y'); ?> Bechdenge.com. All rights reserved.
        </p>
    </div>
</footer>

<?php wp_footer(); ?>

<!-- Initialize Lucide Icons and Mobile Menu -->
<script>
    // Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Mobile Menu Logic
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', function () {
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                mobileMenu.style.display = 'flex';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
    }
</script>
</body>

</html>