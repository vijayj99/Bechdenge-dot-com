<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/logo.png">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <header class="site-header">
        <div class="container">
            <a href="<?php echo home_url(); ?>" class="logo" style="display: flex; align-items: center; gap: 10px;">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/logo.png" alt="Bechdenge Logo"
                    style="height: 40px; width: auto;">
                <span>Bechdenge<span class="text-gradient">.com</span></span>
            </a>

            <!-- Desktop Menu -->
            <nav class="desktop-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary-menu',
                    'container' => false,
                    'menu_class' => '',
                    'fallback_cb' => false,
                    'items_wrap' => '%3$s', // Remove UL wrapper to match flex style if desired, or keep and style UL
                ));
                ?>
                <!-- Hardcoded CTA for design fidelity -->
                <a href="/booking" class="btn btn-primary" style="padding: 0.5rem 1rem">Book Now</a>
            </nav>

            <!-- Mobile Toggle -->
            <button class="mobile-toggle" id="mobile-menu-toggle">
                <i data-lucide="menu"></i>
            </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div class="mobile-menu" id="mobile-menu" style="display: none;">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary-menu',
                'container' => false,
                'fallback_cb' => false,
                'items_wrap' => '%3$s',
            ));
            ?>
            <a href="/booking" class="btn btn-primary"
                style="margin: 1rem; text-align: center; justify-content: center;">Book Now</a>
        </div>
    </header>

    <!-- Spacer for fixed header -->
    <div style="height: 80px;"></div>