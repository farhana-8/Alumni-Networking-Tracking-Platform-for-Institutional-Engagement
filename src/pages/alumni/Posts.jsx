import { useEffect, useState } from "react";
import {
  getPosts,
  createPost,
  likePost,
  addComment,
  filterByCategory
} from "../../services/apiService";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

function Posts() {

const [posts,setPosts] = useState([]);
const [loading,setLoading] = useState(true);

const [title,setTitle] = useState("");
const [content,setContent] = useState("");
const [category,setCategory] = useState("Career");

const [commentText,setCommentText] = useState({});
const [showComments,setShowComments] = useState({});

const [likedPosts,setLikedPosts] = useState({}); // track liked posts

useEffect(()=>{loadPosts()},[]);

const loadPosts = async()=>{
setLoading(true);

const res = await getPosts();

setPosts(res.data);

/*
If backend returns likedByCurrentUser
we use that. Otherwise keep frontend memory
*/
const likedMap = {};
res.data.forEach(p=>{
if(p.likedByCurrentUser){
likedMap[p.id] = true;
}
});

setLikedPosts(likedMap);

setLoading(false);
};

const handleCreate = async()=>{

await createPost({
title,
content,
category,
tags:["career"]
});

setTitle("");
setContent("");

loadPosts();

};

const handleLike = async(id)=>{

// prevent duplicate like
if(likedPosts[id]) return;

try{

await likePost(id);

// update UI immediately
setLikedPosts({...likedPosts,[id]:true});

setPosts(posts.map(p=>
p.id===id
? {...p,likesCount:p.likesCount+1}
: p
));

}catch(err){

alert("You already liked this post");

}

};

const handleComment = async (postId) => {

const text = commentText[postId];

if(!text || text.trim() === ""){
alert("Comment cannot be empty");
return;
}

try{

await addComment(text,postId);

setCommentText({
...commentText,
[postId]:""
});

loadPosts();

}catch(err){

console.error(err);

alert("Failed to post comment");

}

};

const toggleComments=(id)=>{
setShowComments({...showComments,[id]:!showComments[id]});
};

if(loading) return <Loader/>

return(

<div className="p-8 space-y-8">

<h1 className="text-3xl font-bold">
Community Forum
</h1>

{/* Create Post */}

<div className="glass-card p-6 space-y-4">

<input
placeholder="Post title"
value={title}
onChange={e=>setTitle(e.target.value)}
className="glass-input w-full"
/>

<textarea
placeholder="Post content"
value={content}
onChange={e=>setContent(e.target.value)}
className="glass-input w-full"
/>

<select
value={category}
onChange={e=>setCategory(e.target.value)}
className="glass-input w-60"
>
<option>Career</option>
<option>Jobs</option>
<option>Network</option>
</select>

<Button onClick={handleCreate}>
Create Post
</Button>

</div>

{/* Posts */}

<div className="space-y-6">

{posts.map(post=>(

<div key={post.id} className="glass-card p-6 card-hover">

<h3 className="text-xl font-bold">
{post.title}
</h3>

<p className="text-gray-900 mt-2">
{post.content}
</p>

<div className="text-sm text-gray-900 mt-2">
{post.authorName} • {post.category}
</div>

<div className="flex gap-4 mt-4">

<Button
onClick={()=>handleLike(post.id)}
disabled={likedPosts[post.id]}
className={
likedPosts[post.id]
? "bg-green-500 cursor-not-allowed"
: ""
}
>
{likedPosts[post.id] ? "✅ Liked" : `👍 ${post.likesCount}`}
</Button>

<Button
variant="secondary"
onClick={()=>toggleComments(post.id)}
>
💬 {post.comments?.length || 0}
</Button>

</div>

{showComments[post.id] && (

<div className="mt-6 space-y-3">

{post.comments?.map(c=>(

<div key={c.id} className="bg-white/10 p-3 rounded">

<p className="font-semibold">
{c.username}
</p>

<p className="text-gray-900">
{c.content}
</p>

</div>

))}

<div className="flex gap-2">

<input
className="glass-input flex-1"
placeholder="Write comment..."
value={commentText[post.id] || ""}
onChange={e=>setCommentText({...commentText,[post.id]:e.target.value})}
/>

<Button onClick={()=>handleComment(post.id)}>
Post
</Button>

</div>

</div>

)}

</div>

))}

</div>

</div>

);

}

export default Posts;