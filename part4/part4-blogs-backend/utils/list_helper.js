const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce( function(a, b){
        return a + b.likes;
    }, 0);
}

const favoriteBlog = (blogs) => {
    const favoriteBlog =  blogs.sort((a,b)=>b.likes-a.likes)[0]; 
    if(favoriteBlog){
        return {
            title:favoriteBlog.title,
            author:favoriteBlog.author,
            url:favoriteBlog.url
        }
    }
}

module.exports = {
  dummy,
    totalLikes,
    favoriteBlog

}
