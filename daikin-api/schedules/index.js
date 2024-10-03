"use strict";

const schedule = require('node-schedule');
const pendingProposalSchedule = require("./pendingProposalSchedule");
const tempFileSchedule = require("./tempFileSchedule");
const inactiveUserSchedule = require("./inactiveUserSchedule");
const listLostFile = require("./listFile");

const appSchedule = {};

appSchedule.start = () => {
    /***
     * Schedule will run base on server timezone
    ***/
    schedule.scheduleJob({ hour: 20, minute: 0 }, pendingProposalSchedule)
    schedule.scheduleJob({ hour: 21, minute: 0 }, tempFileSchedule)
    schedule.scheduleJob({ hour: 0, minute: 0 }, inactiveUserSchedule)
}

appSchedule.stop = () => {
    /***
     * Cancel schedule include running job
    ***/
    const jobList = schedule.scheduledJobs;
    Object.keys(jobList).forEach((key) =>{
        jobList[key].cancel()
    })
}


module.exports = appSchedule;