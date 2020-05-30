const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    if (!favorite) {
      return blog
    }
    return (favorite.likes > blog.likes) ? favorite : blog
  }
  return blogs.reduce(reducer, undefined)
}

const mostBlogs = (blogs) => {
  const counter = (countByArthur, blog) => {
    (countByArthur[blog.author] === undefined) ? countByArthur[blog.author] = 1 : countByArthur[blog.author] ++
    return countByArthur
  }
  const counts = blogs.reduce(counter, {})
  console.log(counts)
  let arthorThatWriteMost = {name: null, blogs: 0}
  for (let author in counts) {
    if (counts[author] > arthorThatWriteMost.blogs) {
      arthorThatWriteMost = { name: author, blogs: counts[author] }
    }
  }
  return arthorThatWriteMost
}

const mostLikes = (blogs) => {
  const counter = (countByArthur, blog) => {
    (countByArthur[blog.author] === undefined) ? countByArthur[blog.author] = blog.likes : countByArthur[blog.author] += blog.likes
    return countByArthur
  }
  const counts = blogs.reduce(counter, {})
  console.log(counts)
  let arthorThatLikedMost = {name: null, likes: 0}
  for (let author in counts) {
    if (counts[author] > arthorThatLikedMost.likes) {
      arthorThatLikedMost = { name: author, likes: counts[author] }
    }
  }
  return arthorThatLikedMost
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}