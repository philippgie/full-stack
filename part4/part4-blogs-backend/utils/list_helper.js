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

const mostBlogs = (blogs) => {
    if(!blogs.length)return
    const frequency = blogs.reduce((acc, curr) => {
        if (curr.author in acc) {
            acc[curr.author]++;
        } else {
            acc[curr.author] = 1;
        }
        return acc;
    }, {});

    const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
        return {author:sortedFrequency[0][0], count:sortedFrequency[0][1]};
}

const mostLikes = (blogs) => {
    if(!blogs.length)return
    const frequency = blogs.reduce((acc, curr) => {
        if (curr.author in acc) {
            acc[curr.author]+=curr.likes;
        } else {
            acc[curr.author] = curr.likes;
        }
        return acc;
    }, {});

    const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
        return {author:sortedFrequency[0][0], count:sortedFrequency[0][1]};
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
