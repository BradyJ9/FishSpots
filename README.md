# FishSpots
Miro board for tracking features: https://miro.com/app/board/uXjVI8MV2oE=/

## Get Started ##
### Database ###

### Back End ###

### Front End ###
- Run npm install
- Run npm start

### Azurite: Getting Local Blob Storage Running ###
- Go to VS Code Extensions and download "Azurite"
- Start Azurite Blob Service by opening VS Code cmd palette (ctrl+shift+p) and using command "Azurite: Start Blob Service"
    - You may be able to see on the bottom that it is running on 127.0.0.1:10000
- Now go into directory database/azurite and run "python3 upload_test_img_to_azurite.py"
    - Check the output to make sure upload is complete
- You can go look at the uploaded images in Azurite. On the left toolbar of VS Code you should now have an Azure icon.  Click on it, and look towards the bottom to view the storage
    - Go to Attached Storage Accounts > Local Emulator > Blob Containers
    - You should see two containers with images in them.  The sql startup script/data has been changed to reference these file paths instead of hardcoded URLs
- It should all be set up and good to go.  After uploading an image you can go view it in the containers
