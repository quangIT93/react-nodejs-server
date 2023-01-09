const Post = require('../model/Post');
const User = require('../model/User');
class PostController {
    async getItem(req, res) {
        try {
            // populate
            const posts = await Post.find({
                user: req.userId,
            }).populate('user', ['username']);

            res.json({ success: true, posts });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: 'khong lay dc du lieu' });
        }
    }

    async postItem(req, res) {
        const { title, description, url, status } = req.body;

        // do thang title no co require- = true
        if (!title) return res.status(400).json('title la bat buoc nhap');

        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId,
            });
            await newPost.save();
            res.json({
                success: true,
                message: 'happy learning',
                post: newPost,
            });
        } catch (error) {
            return res.status(500).json('loi server');
        }
    }

    async updateItem(req, res) {
        const { title, description, url, status } = req.body;

        if (!title)
            return res
                .status(400)
                .json({ success: false, message: 'title is require' });

        try {
            let updatePost = {
                title,
                description: description || '',
                url:
                    (url.startsWith('https://') ? url : `https://${url}`) || '',
                status: status || 'TO LEARN',
            };

            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            updatePost = await Post.findOneAndUpdate(
                postUpdateCondition,
                updatePost,
                { new: true }
            );

            if (!updatePost)
                return res.status(400).json({
                    success: true,
                    message: 'khong co gi de post hoac user chua xac thuc',
                    updatePost,
                });
            res.json({
                success: true,
                message: `ban da update id${req.params.id} thanh cong`,
                post: updatePost,
            });
        } catch (error) {
            return res.status(400).json('loi server');
        }
    }

    async deleteItem(req, res) {
        try {
            const postDeleteCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            const deletePost = await Post.findOneAndDelete(postDeleteCondition);
            if (!deletePost)
                return res.status(400).json({
                    success: false,
                    message: "don't delete post or user is authorization",
                });
            res.json({
                success: true,
                message: 'ban da xoa thanh cong',
                post: deletePost,
            });
        } catch (error) {
            return res.status(400).json('loi server');
        }
    }
}

module.exports = new PostController();
