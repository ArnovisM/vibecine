import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, MessageSquare, Monitor, PlayCircle, Plus, Check, X } from 'lucide-react';
import { getMovieDetails, getMovieReviews, getMovieVideos, getSimilarMovies, MovieDetails as MovieDetailsType, Review, Video, Movie, getImageUrl } from '../services/api';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from './MovieCard';
import { extractIdFromSlug } from '../utils/slug';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetailsType | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);

    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                // Scroll to top when ID changes
                window.scrollTo(0, 0);

                // Extract numeric ID from slug (e.g., "inception-27205" -> 27205)
                const movieId = extractIdFromSlug(id);

                const [movieData, reviewsData, videosData, similarData] = await Promise.all([
                    getMovieDetails(movieId),
                    getMovieReviews(movieId),
                    getMovieVideos(movieId),
                    getSimilarMovies(movieId)
                ]);
                setMovie(movieData);
                setReviews(reviewsData);
                setVideos(videosData);
                setSimilarMovies(similarData);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="container" style={{ paddingTop: '6rem' }}>Loading...</div>;

    if (!movie) return (
        <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Movie not found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>We couldn't find the movie you're looking for.</p>
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--primary)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold'
            }}>
                <ArrowLeft size={20} />
                Back to Home
            </Link>
        </div>
    );

    const providers = movie['watch/providers']?.results?.US;
    const streaming = providers?.flatrate || [];
    const rent = providers?.rent || [];
    const cast = movie.credits?.cast?.slice(0, 6) || [];
    const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const inWatchlist = isInWatchlist(movie.id);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Hero Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '70vh',
                backgroundImage: `url(${movie.backdrop_path ? getImageUrl(movie.backdrop_path, 'original') : `https://source.unsplash.com/1600x900/?${movie.genres[0]?.name || 'movie'}`})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                zIndex: -1
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)' }}></div>
            </div>

            <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
                <button onClick={() => window.history.back()} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    color: 'white',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    backdropFilter: 'blur(4px)'
                }}>
                    <ArrowLeft size={20} />
                    Back
                </button>

                <div className="movie-details-grid">
                    {/* Poster */}
                    <div className="glass movie-details-poster">
                        <img
                            src={movie.poster_path ? getImageUrl(movie.poster_path) : `https://source.unsplash.com/500x750/?${movie.genres[0]?.name || 'movie'}`}
                            alt={movie.title}
                            style={{ width: '100%', display: 'block' }}
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>{movie.title}</h1>
                        {movie.tagline && (
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                                "{movie.tagline}"
                            </p>
                        )}

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star fill="var(--mood-happy)" color="var(--mood-happy)" size={20} />
                                <span style={{ color: 'white', fontWeight: 'bold' }}>{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={20} />
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                            {movie.runtime > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={20} />
                                    <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            {trailer && (
                                <button
                                    onClick={() => setShowTrailer(true)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <PlayCircle size={20} />
                                    Watch Trailer
                                </button>
                            )}
                            <button
                                onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: inWatchlist ? 'rgba(255,255,255,0.2)' : 'var(--secondary)',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    border: inWatchlist ? '1px solid rgba(255,255,255,0.3)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {inWatchlist ? <Check size={20} /> : <Plus size={20} />}
                                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                            {movie.genres.map(g => (
                                <span key={g.id} style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    fontSize: '0.875rem'
                                }}>
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h3>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.8 }}>
                            {movie.overview}
                        </p>

                        {/* Cast */}
                        {cast.length > 0 && (
                            <div style={{ marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Top Cast</h3>
                                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                                    {cast.map(actor => (
                                        <div key={actor.id} style={{ minWidth: '100px', textAlign: 'center' }}>
                                            <div style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                margin: '0 auto 0.5rem',
                                                background: 'var(--bg-card)'
                                            }}>
                                                {actor.profile_path ? (
                                                    <img src={getImageUrl(actor.profile_path, 'w500')} alt={actor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>?</div>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{actor.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Streaming Providers */}
                        {(streaming.length > 0 || rent.length > 0) && (
                            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Monitor size={24} />
                                    Where to Watch
                                </h3>

                                {streaming.length > 0 && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1rem' }}>Stream</h4>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {streaming.map(provider => (
                                                <div key={provider.provider_id} title={provider.provider_name} style={{ width: '50px', height: '50px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                                    <img src={getImageUrl(provider.logo_path)} alt={provider.provider_name} style={{ width: '100%' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {rent.length > 0 && (
                                    <div>
                                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1rem' }}>Rent/Buy</h4>
                                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            {rent.map(provider => (
                                                <div key={provider.provider_id} title={provider.provider_name} style={{ width: '50px', height: '50px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                                                    <img src={getImageUrl(provider.logo_path)} alt={provider.provider_name} style={{ width: '100%' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reviews */}
                        {reviews.length > 0 && (
                            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '3rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageSquare size={24} />
                                    User Reviews
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {reviews.map(review => (
                                        <div key={review.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{review.author}</span>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                                {review.content.length > 300 ? review.content.slice(0, 300) + '...' : review.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Similar Movies */}
                        {similarMovies.length > 0 && (
                            <div style={{ marginTop: '4rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>You Might Also Like</h3>
                                <div className="movie-grid">
                                    {similarMovies.slice(0, 5).map(movie => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Trailer Modal */}
            {showTrailer && trailer && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.9)',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }} onClick={() => setShowTrailer(false)}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', aspectRatio: '16/9' }}>
                        <button
                            onClick={() => setShowTrailer(false)}
                            style={{
                                position: 'absolute',
                                top: '-3rem',
                                right: 0,
                                color: 'white',
                                background: 'transparent'
                            }}
                        >
                            <X size={32} />
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ borderRadius: '1rem' }}
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
