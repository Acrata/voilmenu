<?php
function my_theme_enqueue_styles() {

    $parent_style = 'parent-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function child_scripts_menu (){
    wp_dequeue_script('menu_test-scripts');
    wp_enqueue_script('child_scripts', get_stylesheet_directory_uri() . '/assets/scripts/project.min.js', array('jquery'), true);

}
add_action('wp_print_scripts', 'child_scripts_menu', 100);
add_filter('show_admin_bar', '__return_false');

?>
