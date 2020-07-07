const express = require('express');
const { User, Post, Url } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('./login');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const router = express.Router();

router.get('/', isLoggedIn, async(req, res, next) => {
    Post.findAll({
            include: [{
                model: User,
                attributes: ['id', 'nick'],
            }],
            order: [
                ['createdAt', 'DESC']
            ],
        })
        .then((posts) => {
            console.log(posts[0]);
            res.render('board', {
                title: 'Web Programing Minorroject',
                posters: posts,
                user: req.user,
            });
        })
        .catch((error) => {
            console.error(error);
            next(error);
        })
});


// uploads 폴더가 존재하지 않을 때 예외처리를 통하여 파일 생성
fs.readdir('uploads', (error) => {
    if (error) {
        console.error('Not Found Folders');
        fs.mkdirSync('upload');
    }
});

const upload = multer({ //diskStorage,limits 속성
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            // cb(null, path.basename(file.originalname), ext);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 이미지 파일 크기 설정
});


router.post('/img', isLoggedIn, upload.array('photo', 2), (req, res) => {

    console.log(req.files);

    let imageUrl_save = new Array;

    for (i = 0; i < req.files.length; i++) {
        imageUrl_save.push(`/img/${req.files[i].filename}`); // 문자열
    }
    console.log(imageUrl_save);
    res.json(imageUrl_save);
});

const upload2 = multer();

router.get('/write', isLoggedIn, async(req, res, next) => {
    try {
        res.render('board_write', {
            title: 'Web Programing Minor board write',
            user: req.user,
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
})
router.post('/write', isLoggedIn, upload2.none(), async(req, res, next) => {
    try {
        var image = req.body.url;
        console.log(" 0 " + image[1] + " /// " + " 1 " + image[2]);
        console.log(image.length);

        const post = await Post.create({
            boardName: req.body.Name,
            boardText: req.body.Text,
            UserId: req.user.id,
        });

        if (image) {
            console.log(image.length)
            for (i = 1; i <= image.length - 1; i++) {
                const url = await Url.create({
                    imageUrl: image[i],
                    BoardId: post.id,
                });
            }
        }

        // for (i = 1; i <= image.length - 1; i++) {
        //     const url = await imageUrl.create({
        //         imageUrl: image[i],
        //     })
        // }


        res.redirect('/board');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/detail/:id', isLoggedIn, async(req, res, next) => {

    const postFind = Post.findAll({
            include: [{
                model: Url,
                attributes: ['imageUrl'],
            }],
            where: { id: req.params.id }, // 게시글의 id값으로 post 에서 조회
        })
        .then((posts) => {
            res.render('board_detail', {
                title: 'first-project-board-update',
                user: req.user,
                detail: posts[0],
                id: req.params.id,
            });
            console.log(posts);
        })
        .catch((error) => {
            console.error(error);
            next(error);
        })

});

router.post('/delete/:id', isLoggedIn, async(req, res, next) => {
    try {
        await Post.destroy({ where: { id: req.params.id, userid: req.user.id } });
        res.redirect('/board');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/update/:id', isLoggedIn, (req, res, next) => {
    Post.findAll({
            where: { id: parseInt(req.params.id) }, // 게시글의 id값으로 post 에서 조회
        })
        .then((posts) => {
            res.render('board_update', {
                title: 'first-project-board-update',
                user: req.user,
                updater: posts[0],
                id: req.params.id,
            });
        })
        .catch((error) => {
            console.error(error);
            next(error);
        })
});


router.post('/update/:id', isLoggedIn, async(req, res, next) => {
    try {
        var id = parseInt(req.params.id);
        await Post.update({
            boardName: req.body.boardnameUpdate,
            boardText: req.body.boardtextUpdate,
        }, {
            where: { id: id },
        }, );
        console.log('게시글 수정 완료 ~!');
        res.redirect('/board');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;