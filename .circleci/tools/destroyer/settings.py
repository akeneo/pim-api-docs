import yaml
from pathlib import Path


class Settings:
    def __init__(
        self,
        application_short_name,
        gcp_project_id,
        gcp_project_region,
        gcp_project_artifact_registry_name,
        terraform_version,
        terraform_sources_path,
        terraform_bucket_name,
    ):
        self.application_short_name = application_short_name
        self.gcp_project_id = gcp_project_id
        self.gcp_project_region = gcp_project_region
        self.gcp_project_artifact_registry_name = gcp_project_artifact_registry_name
        self.terraform_version = terraform_version
        self.terraform_sources_path = terraform_sources_path
        self.terraform_bucket_name = terraform_bucket_name

    def __repr__(self):
        return f"{self.__class__.__name__}(application_short_name={self.application_short_name}, gcp_project_id={self.gcp_project_id}, gcp_project_region={self.gcp_project_region})"


with open(Path(__file__).with_name("config.yml"), "r") as ymlfile:
    cfg = yaml.safe_load(ymlfile)

settings = Settings(
    cfg["application"].get("short_name"),
    cfg["gcp_project"].get("id"),
    cfg["gcp_project"].get("region"),
    cfg["gcp_project"].get("artifact_registry_name"),
    cfg["terraform"].get("version"),
    cfg["terraform"].get("sources_path"),
    cfg["terraform"].get("bucket_name"),
)

if __name__ == "__main__":
    print(settings)
