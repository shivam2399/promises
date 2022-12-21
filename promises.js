const posts = [
    { title: 'Post one', body: 'This is post one', createdAt: new Date().getTime() },
    { title: 'Post two', body: 'This is post two', createdAt: new Date().getTime() }
];

let intervalId = 0;

function getPosts() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        let output = '';
        for(let i=0;i<posts.length;i++) {
            output += `<li>${posts[i].title} - last updated ${(new Date().getTime() - posts[i].createdAt) / 1000} seconds ago </li>`
        }
        document.body.innerHTML = output;
    }, 1000)
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({ ...post, createdAt: new Date().getTime()});

            const error = false;

            if(!error) {
                resolve();
            }
            else {
                reject('Error: Something went wrong');
            }
        }, 1000)
    });
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(posts.length>0){
                const lastPost = posts.pop();
                resolve(lastPost);
            }
            else {
                reject('Array is empty');
            }
        }, 1000);
    });
}




createPost({ title: 'Post three', body: 'This is post three' } )
.then(() => {
    createPost({ title: 'Post four', body: 'This is post four' });
    getPosts()
    deletePost().then((lastPost) => {
        console.log(lastPost);
        getPosts();
        deletePost().then((lastPost) => {
            console.log(lastPost);
            getPosts();
            deletePost().then((lastPost) => {
                console.log(lastPost);
                getPosts();
                deletePost().then((lastPost) => {
                    console.log(lastPost);
                    getPosts();
                    deletePost().then(() => {})
                    .catch((err) => {
                        console.log('Inside catch block', err);
                    })
                })
                
            })
        })
    })
})


