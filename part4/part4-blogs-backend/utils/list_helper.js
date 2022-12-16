const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( function(a, b){
        return a + b.likes;
    }, 0);
}

module.exports = {
  dummy,
    totalLikes
}
