<?php get_header(); ?>

<main class="site-main section-padding">
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <?php if ( ! is_front_page() ) : ?>
                        <header class="entry-header" style="text-align: center; margin-bottom: 2rem;">
                            <h1 class="entry-title" style="margin-bottom: 1rem; color: var(--color-accent-primary);">
                                <?php the_title(); ?>
                            </h1>
                        </header>
                    <?php endif; ?>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>

            <?php endwhile; ?>
        <?php else : ?>
            <p><?php _e( 'Sorry, no posts matched your criteria.', 'bechdenge' ); ?></p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
