<?php
function bechdenge_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style( 'bechdenge-style', get_stylesheet_uri() );
    
    // Add Google Fonts
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;600&display=swap', array(), null );
    
    // Load Lucide Icons (using CDN for simplicity in this generated theme)
    wp_enqueue_script( 'lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'bechdenge_scripts' );

// Register Menus
function bechdenge_menus() {
    register_nav_menus(
        array(
            'primary-menu' => __( 'Primary Menu' ),
            'footer-menu'  => __( 'Footer Menu' )
        )
    );
}
add_action( 'init', 'bechdenge_menus' );

// Add Theme Support
function bechdenge_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'bechdenge_setup' );
?>
