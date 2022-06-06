# [FL Legal Documents API](https://fl-legal-docs-api.herokuapp.com/)
This API will eventually be utilized to generate a variety of legal documents (e.g. summonses, motions) for e-filing in Florida. It currently only contains small claims data for Broward, Manatee, and Santa Rosa summonses that has been hard-coded in. Requests can currently be made using https://fl-legal-docs-api.herokuapp.com/summons/countyName&tier to get summons text (replace countyName with the county name and tier with sc, cc, or ca).

## Tech Used
<img src="https://img.shields.io/static/v1?label=|&message=Express&labelColor=42494F&color=3d607e&style=for-the-badge&logo=Express&logo-color=white"/>    
<img src="https://img.shields.io/static/v1?label=|&message=Node.js&labelColor=42494F&color=3d607e&style=for-the-badge&logo=Node.js&logo-color=white"/>  
<img src="https://img.shields.io/static/v1?label=|&message=JavaScript&labelColor=42494F&color=3d607e&style=for-the-badge&logo=JavaScript&logo-color=white"/>
<img src="https://img.shields.io/static/v1?label=|&message=HTML5&labelColor=42494F&color=213a59&style=for-the-badge&logo=HTML5&logo-color=white"/>
The server for this API was built using node and express. Testing for the get requests was performed using Postman. 

## Future Optimizations
While the API functionality of this app is working, the data it contains still has a long way to go before it's functional. I will be working on the following:
- Adding the ability to make POST, PUT, and DELETE requests
- Adding in the missing summons data for all Florida counties
- Adding functionality for Motions to Appoint Process Server
- Migrate summons data to a database rather than leaving it hard-coded into the server file

## Lessons Learned
When I was first starting to work with APIs, I kept running into a CORS error that prevented me from being able to use the API. It was very cool to discover that the solution to this issue was just adding in a couple lines of code to require and ensure the API met the CORS standard.