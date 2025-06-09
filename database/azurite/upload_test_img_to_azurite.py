import os
from azure.storage.blob import BlobServiceClient

# Azurite connection string

connection_string = (
    "DefaultEndpointsProtocol=http;"
    "AccountName=devstoreaccount1;"
    "AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;"
    "BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;"
)

# Containers to create and upload to
containers = ['locationimages', 'catchimages']

# Initialize the BlobServiceClient
blob_service_client = BlobServiceClient.from_connection_string(connection_string)

for container_name in containers:
    container_client = blob_service_client.get_container_client(container_name)

    try:
        container_client.create_container()
        print(f"Created container: {container_name}")
    except Exception:
        print(f"Container '{container_name}' may already exist. Skipping creation.")

    local_folder = os.path.join(os.getcwd(), container_name)
    if not os.path.exists(local_folder):
        print(f"Local folder '{local_folder}' does not exist. Skipping.")
        continue

    for filename in os.listdir(local_folder):
        file_path = os.path.join(local_folder, filename)
        if os.path.isfile(file_path):
            blob_client = container_client.get_blob_client(filename)
            with open(file_path, "rb") as data:
                blob_client.upload_blob(data, overwrite=True)
                print(f"Uploaded '{filename}' to container '{container_name}'.")

print("Upload complete.")
