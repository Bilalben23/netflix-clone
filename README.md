# Get the list of official genres for movies:

- GET: `https://api.themoviedb.org/3/genre/movie/list?language=en`

# Get the list of official genres for TV shows.

- GET: `https://api.themoviedb.org/3/genre/tv/list`

# Get a list of movies that are currently in theatres.

- GET: `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`

# Get a list of movies ordered by popularity.

- GET: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`

# Get a list of movies ordered by rating.

- GET: `https://api.themoviedb.org/3/movie/top_rated`

# Get a list of movies that are being released soon.

- GET: `https://api.themoviedb.org/3/movie/upcoming`

# Get the top level details of a movie by ID.

- GET: `https://api.themoviedb.org/3/movie/{movie_id}`

# Get the alternative titles for a movie.

- GET: `https://api.themoviedb.org/3/movie/{movie_id}/alternative_titles`

# Get the images that belong to a movie.

- GET: `https://api.themoviedb.org/3/movie/{movie_id}/images`

# Keywords:

- GET: `https://api.themoviedb.org/3/movie/{movie_id}/keywords`

# Get the newest movie ID.

- GET: `https://api.themoviedb.org/3/movie/latest`

# Get the similar movies based on genres and keywords.

- GET: `https://api.themoviedb.org/3/movie/{movie_id}/similar`

# Video

- GET: `https://api.themoviedb.org/3/movie/{movie_id}/videos`

# Search for movies by their original, translated and alternative titles.

- GET: `https://api.themoviedb.org/3/search/movie`

# Use multi search when you want to search for movies, TV shows and people in a single request.

- GET: `https://api.themoviedb.org/3/search/multi`

# Search for people by their name and also known as names.

- GET: `https://api.themoviedb.org/3/search/person`

# Search for TV shows by their original, translated and also known as names.

- GET: `https://api.themoviedb.org/3/search/tv`
