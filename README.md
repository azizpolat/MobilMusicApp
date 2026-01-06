    const favoritesTracks = useFavorites().favorites

    const filteredFavoritesTracks = useMemo(() => {
    	if (!search) return favoritesTracks

    	return favoritesTracks.filter(trackTitleFilter(search))
    }, [search, favoritesTracks])
