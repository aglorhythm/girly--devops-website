# Hi there 🌸

This is the repository of girlysheet.cloud website ! I made it public so you can observe how I manage to deploy my infrastructure.

But wait ..

The CDN is not up to date yet ! You can still access the website and, below, you will find the architecture of this project.

## Architecture 🌼

### Frontend

- **AWS** (Amazon Web Services)
    - **EC2 (Elastic Compute Cloud)**: Serves as the dynamic web hosting service, providing scalable compute capacity.
    - **S3 (Simple Storage Service)**: Used for storing infrastructure state.
    - **CloudFront**: Implemented as a CDN (Content Delivery Network), CloudFront speeds up the delivery of content by caching static resources closer to users.

### Backend

- **OVH** : Provides hosting for WordPress, enabling easy content management and backend updates without direct modifications to backend code.

### DevOps

- **Github** :
    - **Repos**: Manages source code using Azure Repos, offering secure version control.
- **Azure** :
    - **Pipelines**: Automates builds and deployments using Azure Pipelines, ensuring smooth and continuous integration and deployment processes.
    - **Container Registry**: Hosts Docker container image of the frontend that is used in deployments (EC2), supporting consistent and reproducible builds.

### Database

- **Azure MySQL** : The primary database used by the website, storing all dynamic data and user information securely and efficiently.


![Girlysheet Architecture](https://res.cloudinary.com/dhugrtkns/image/upload/v1718276990/girlysheet_architecture_1_hphmb9.png)

## Stay Connected 🌹

Connect with me on [LinkedIn](https://www.linkedin.com/in/oaman) to stay updated on my latest projects and adventures in the world of DevOps.


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
