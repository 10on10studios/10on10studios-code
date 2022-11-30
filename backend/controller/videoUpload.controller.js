require("dotenv").config();
const fs = require('fs')
const { shows, category } = require('../models')
const multer = require('multer')
var path = require('path')
const upload = multer({
  dest: '/uploads'
})

const { Web3Storage, getFilesFromPath } = require('web3.storage')


class video {
  async videoUpload(req, res) {
    try {
      const { categoryId, video_title, thumbnail, description} = req.body

        const fdata = await category.findOne({
          where:{category_id:categoryId}
        })

        // console.log(fdata)

        if(fdata){
      // console.log("thidkifdbsl",req.body);
      var card_img = req.file.originalname
      // console.log(card_img)
      const token = process.env.API_TOKEN
      console.log(token)
      const storage = new Web3Storage({ token })

      const pathFiles = await getFilesFromPath(`./uploads/${card_img}`)
      
      // console.log(pathFiles)
      const url = card_img.replace(/\ /g, "%20");
      // console.log(url)
      const cid = await storage.put(pathFiles)
      const showUrl = `https://${cid}.ipfs.w3s.link/${card_img}`;
      // const imgUrl = `https://${cid}.ipfs.w3s.link/`
      const data = await shows.create({ video_title, thumbnail, description, video_src:showUrl, categoryId:fdata.id })
      // console.log('Content added with CID:', cid)
      fs.unlink(`./uploads/${card_img}`, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
      res.json({
        msg: "Success",
        data: data
      })
        }
    } catch (e) {
      console.log(e)
      res.json({
        msg: "failure"
      })
    }
  }



  async videothumbnailUpload(req, res) {
    try {
      const { video_id } = req.body

        const fdata = await shows.findOne({
          where:{video_id:video_id}
        })

        // console.log(fdata)

        if(fdata){
      // console.log("thidkifdbsl",req.body);
      var card_img = req.file.originalname
      // console.log(card_img)
      const token = process.env.API_TOKEN
      console.log(token)
      const storage = new Web3Storage({ token })

      const pathFiles = await getFilesFromPath(`./uploads/${card_img}`)
      
      // console.log(pathFiles)
      const url = card_img.replace(/\ /g, "%20");
      // console.log(url)
      const cid = await storage.put(pathFiles)
      const showUrl = `https://${cid}.ipfs.w3s.link/${card_img}`;
      // const imgUrl = `https://${cid}.ipfs.w3s.link/`
      const data = await shows.update({ thumbnail:showUrl }, { where: { video_id:video_id } })
      // console.log('Content added with CID:', cid)
      fs.unlink(`./uploads/${card_img}`, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
      res.json({
        msg: "Success",
        data: data
      })
        }
    } catch (e) {
      console.log(e)
      res.json({
        msg: "failure"
      })
    }
  }

  async categories(req, res) {
    try {
      const { category_name} = req.body    
      const existCategory = await category.findOne({
        where:{ category_name: category_name} 
      })
      if (existCategory) {
         res.json({
          msg: "category already exist"
        })
      } 
      if(!existCategory) {
        var card_img = req.file.originalname
      // console.log(card_img)
      const token = process.env.API_TOKEN
      console.log(token)
      const storage = new Web3Storage({ token })

      const pathFiles = await getFilesFromPath(`./uploads/${card_img}`)
      
      // console.log(pathFiles)
      const url = card_img.replace(/\ /g, "%20");
      // console.log(url)
      const cid = await storage.put(pathFiles)
      const showUrl = `https://${cid}.ipfs.w3s.link/${card_img}`;
      // const imgUrl = `https://${cid}.ipfs.w3s.link/`
      const data = await category.create({ category_name, category_img:showUrl})
      // console.log('Content added with CID:', cid)
      fs.unlink(`./uploads/${card_img}`, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
      res.json({
        msg: "Success",
        data: data
    
      
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async fetchAllcategories(req, res) {
    try {
      const data = await category.findAll()
      if (data) {
         res.json({
          msg: "Success",
          data:data
        })
      } 
      if(!data) {
        res.json({
          msg: "failure",
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async fetchsinglecategory(req, res){
    try{
      const category_id = req.params.uuid
      const data = await category.findOne({where:{category_id:category_id},
        include:[{model:shows, order: [["id", "DESC"]]}],
        
        // order: 'id desc'
        
      })
      // console.log(data)
        if(data){
          res.json({
            msg:"Success",
            data:data
          })
        }

        if(!data){
          res.json({
            msg:"faliure",
            data:data
          })
        }
    
    }catch(e){
      console.log(e)
    }
  }

  async fetchsinglevideo(req, res){
    try{
      // const category_id = req.params.uuid
      const video_id = req.params.uuid
      const data = await shows.findOne({where:{video_id:video_id},
        include:[{
          model:category,
          attributes:[
            "category_id",
            "category_name"
          ]
        }]
      })
      // console.log(data)
        if(data){
          res.json({
            msg:"Success",
            data:data
          })
        }

        if(!data){
          res.json({
            msg:"faliure",
            data:data
          })
        }
    
    }catch(e){
      console.log(e)
    }
  }

  async fetchAllvideo(req, res){
    try{
const data = await shows.findAll({order: [["id", "DESC"]]})
 res.json({
  msg:"Success",
  data:data
 })

}catch(e){
      console.log(e)
      res.json({
        msg:"failure"
      })
    }
  }

}
module.exports = new video()