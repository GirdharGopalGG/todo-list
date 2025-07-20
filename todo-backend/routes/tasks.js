const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/',async(req,res)=>{
    try{
        const task = await Task.find()
        res.json(task)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
})

router.post('/',async(req,res)=>{
    const task = new Task({text:req.body.text})
    try{
        const newTask = await task.save()
        res.status(201).json(newTask)
    }catch{
        res.status(400).json({message:err.message})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({message:"task not found"})
        }
        task.completed = !task.completed
        await task.save()
        res.json(task)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id)
        if(!task) return res.status(404).json({
            msg:"task not found"
        })
        await Task.findByIdAndDelete(req.params.id)
        res.json({
            message:'task deleted'
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})


module.exports = router