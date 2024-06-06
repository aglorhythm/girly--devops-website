# Hi there 🌸

This is the repository of girlysheet.cloud website ! I made it public so you can observe how I manage to deploy my infrastructure.

But wait ..

The website is ot online yet ! But below you will find the architecture of this project. Until the deployment to production, it might be updated.

## Architecture 🌼

### Frontend

- **AWS** (Amazon Web Services)
    - **EC2 (Elastic Compute Cloud)**: Serves as the dynamic web hosting service, providing scalable compute capacity.
    - **S3 (Simple Storage Service)**: Used for storing infrastructure state.
    - **CloudFront**: Implemented as a CDN (Content Delivery Network), CloudFront speeds up the delivery of content by caching static resources closer to users.

### Backend

- **OVH** : Provides hosting for WordPress, enabling easy content management and backend updates without direct modifications to backend code.

### DevOps

- **Azure** :
    - **Repos**: Manages source code using Azure Repos, offering secure version control.
    - **Pipelines**: Automates builds and deployments using Azure Pipelines, ensuring smooth and continuous integration and deployment processes.
    - **Container Registry**: Hosts Docker container image of the frontend that is used in deployments, supporting consistent and reproducible builds.

### Database

- **Azure MySQL** : The primary database used by the website, storing all dynamic data and user information securely and efficiently.


![Girlysheet Architecture](https://res.cloudinary.com/dhugrtkns/image/upload/v1717665234/girlysheet_architecture_iwox1e.png)

## Stay Connected 🌹

Connect with me on [LinkedIn](https://www.linkedin.com/in/your-linkedin-profile) to stay updated on my latest projects and adventures in the world of DevOps.


---

Happy Exploring and Deploying! Let's make the tech world a bit more girly and a lot more powerful! 🌟

```
 _    _                                                _  _
| |  | |                                              | |(_)
| |__| |  __ _  _ __   _ __   _   _    ___   ___    __| | _  _ __    __ _
|  __  | / _` || '_ \ | '_ \ | | | |  / __| / _ \  / _` || || '_ \  / _` |
| |  | || (_| || |_) || |_) || |_| | | (__ | (_) || (_| || || | | || (_| |
|_|  |_| \__,_|| .__/ | .__/  \__, |  \___| \___/  \__,_||_||_| |_| \__, |
               | |    | |      __/ |                                 __/ |
               |_|    |_|     |___/                                 |___/
                                      @aglorhythm
```
