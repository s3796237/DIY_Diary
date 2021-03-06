import { adminService, userService } from '../_services';
import { alertActions } from './alert.actions';
import qs from 'qs';

export const adminActions = {
    updateDiaryParameters,
    deleteDiaryParameters,
    recoverDiaryParameters,
    getAllUsers,
    changeActive,
    updateUserProfile,
    download,
    registerAdmin
};

async function updateDiaryParameters(userId, target, description, close) {

    return adminService.updateDiaryParameters(userId, target, description)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = qs.parse(response.returnObj);
                            alertActions.show_success("The option is added.", "ID: " + resultObj.id + "; Description: " + resultObj.description, true, 0, close())
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot add option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function deleteDiaryParameters(userId, target, deleteOptions) {
    return adminService.deleteDiaryParameters(userId, target, deleteOptions)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = response.returnObj;
                            alertActions.show_success("Deletion is completed successfully.", "", true, 0, null);
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot delete option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function recoverDiaryParameters(userId, target, recoverOptions) {

    return adminService.recoverDiaryParameters(userId, target, recoverOptions)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = response.returnObj;
                            alertActions.show_success("Recovery is completed successfully.", "", true, 0, null);
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot recover option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function getAllUsers(user) {

    return adminService.getAllUsers(user.id, user.email, user.name, user.phone, user.addressStreet, user.addressSurburb, user.addressPostcode, user.addressState, user.active)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            let resultObj = response.returnObj;
                            return resultObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot recover option.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

async function changeActive(user, status) {

    return adminService.changeActive(user.id, status)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            return response;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot change the user status.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}


async function download(period) {

    return adminService.download(period)
            .then(
                response => response.blob()
            ).then((blob) => {
                if (blob){
                    // 2. Create blob link to download
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'report-'+(period===0?'weekly':'monthly')+'.csv');
                    // 3. Append to html page
                    document.body.appendChild(link);
                    // 4. Force download
                    link.click();
                    // 5. Clean up and remove the link
                    link.parentNode.removeChild(link);
                }
              });
}

async function updateUserProfile(user) {

    return adminService.updateUserProfile(user.id, user.name, user.email, user.phone, user.addressStreet, user.addressSurburb, user.addressPostcode, user.addressState)
            .then(
                response => { 
                    if (response){
                        let result_code = response.resultCode;
                        if (result_code === 0){
                            alertActions.show_success("Update the user successfully.", "", true, 0, null);
                            return response.returnObj;
                        }else if (result_code === 1){
                            let message = response.returnObj;
                            alertActions.show_info("Failed", message, null);
                        }else{
                            let message = response.returnObj;
                            alertActions.show_error("Failed", message, null);
                        }
                    }else{
                        alertActions.show_error("Cannot change the user status.","", null);
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                    return null;
                }
            );
}

function registerAdmin(role, name, email, password) {
    return  userService.register(role, name, email, password)
            .then(
                user => { 
                    if (user){
                        alertActions.show_success("Add admin successful.","", true, 0, null);
                        return user;
                    }else{
                        alertActions.show_error("Add admin","Please check your information.");
                    }
                    return null;
                },
                error => {
                    alertActions.show_error(error.toString(), "", null);
                }
            );
}
