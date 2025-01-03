# Getting started

## Prerequisites

The Supplier Data Manager API is available exclusively to customers of the Supplier Data Manager (SDM) platform. If you're not yet a customer and would like to get access, please contact your Customer Success Manager (CSM) to learn more about how to get started. Once you have access, the API allows for seamless integration and automation of your product data processes.

So this guide is for you if you have:
- An active user account on the Supplier Data Manager (SDM) platform
- A project (in the user's organization)
- One or more output formats defined

## Step 1: Get your token

The API requires a token, you can generate one by calling this endpoint:

```
POST https://sdm.akeneo.cloud/api/v1/auth/token/
{
    "email": "customer@company.com"
    "password": "MySecurePassword",
    "token_name": "any name"
}
```

:::info
The `token_name` key can be arbitrarily decided, it is only used for administrative purposes.
:::
::: warning
The `email` and `password` keys must be those of your user account
:::

The response contains the `key` in UUID v4 format:
```
{
    "key": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

This key allows you to authenticate on all SDM API endpoints, so it **must be kept secret**.
From this stage, all requests must be authenticated by passing the token in the headers:

```
Authorization: Token ${key}
```

## Step 2: Send a file

SDM projects run on files with product data. Two possibilities to send it to the platform:

### Flat file upload

This file can have two formats:

- Excel file, with the xlsx extension, encoded in utf-8, with the data in the first tab
- CSV file, with csv extension, can use `,`, `;` or `|` as a separator and be encoded in utf-8 or ISO 8859-1 / Latin-1

In both cases, the file must have a header in the first line and be composed of at least the columns defined in the template.

To upload the file, you need to make the following request:
```
POST https://sdm.akeneo.cloud/api/v1/files/
{
    "file": my file
}
```

The request must have `multipart/form-data` in its headers.

The response is mainly composed of the `id` of the uploaded file, which must be kept for later.

```
{
    "id": 17
    ...
}
```

:::info
More information on the files endpoint on our [API reference](https://sdm.akeneo.cloud/doc/v1/redoc/#tag/files/operation/files_create)
:::

### Sending a JSON payload

The other option to create a file is to send the data in JSON. To do this you need to make the following request:
```
POST https://sdm.akeneo.cloud/api/v1/files/
{
    "data": [
			{"col1": "val1_1", "col2": "val1_2", ...},
			{"col1": "val2_1", "col2": "val2_2", ...},
			...
		]
}
```

The payload is a list of objects, each representing a line with a format `"column name" : "column value"`. All the columns defined in the template must be present. Empty values can be ignored or set with the value `null`.

As for file sending, the response is mainly composed of the `id` key which must be kept for later.
```
{
    "id": 17
    ...
}
```

## Step 3: Create a job

Now we can launch the processing of your file or data sent.
First, you need to create what is called a `job` and link it to the previously uploaded file or payload sent.

:::info
It is necessary to have the `id` of the project that you want to use. You can use the endpoint to list projects, more information on our [API reference](https://sdm.akeneo.cloud/doc/v1/redoc/#tag/projects/operation/projects_list)
:::

Send this request to create the job:
```
POST https://sdm.akeneo.cloud/api/v1/jobs/
{
    "file_id": ${uploaded_file_id},
    "name": "any name you want",
    "project": ${project_id},
    "model_version": 0
}
```

The response is mainly composed of the `id` key which is used to identify the job thus created.
```
{
    "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

**Congrats, SDM platform is now processing your data!**


## Step 4: Retrieve the results of a job

:::info
To know if your job is done, you need to [check its status](/supplier-data-manager/common-usage.html#get-the-status-of-job).
:::

When a job is finished (status at `done`), you can retrieve the results:
```
GET https://sdm.akeneo.cloud/api/v1/jobs/${job_id}/download/${output_format_id}/
```

This request generates an output file in the format specified in the `output format` (CSV or Excel) which can be downloaded.

## Support

In case of questions, you can contact SDM’s support by [creating a ticket in Akeneo’s portal](http://sdm-support.akeneo.com/).

::: panel-link And now, let's discover all the Supplier Data Manager API capabilities [API reference](https://sdm.akeneo.cloud/doc/v1/redoc/)
:::

## Fair-usage protection

Our API facilitates the integration of Akeneo Supplier Data Manager with external systems. To maintain optimal user experience and platform stability, our platform employs various protection mechanisms to prevent over-usage. 
Please adhere to the following usage guidelines:

### Rate limits within a specific amount of time

- Up to 10 API requests per second.

### Handling Over-Usage

If your API usage exceeds these limits, the platform’s protection mechanisms may be triggered, resulting in blocked requests and HTTP status code 429 responses.
As a REST API consumer, you have to keep in mind that your integration with Akeneo Supplier Data Manager should anticipate this throttling and should be able to handle failures.

Bursts are allowed, but continuous over-usage will trigger the protection sooner.

To effectively manage and mitigate over-usage, we recommend implementing the following strategies:

**Check for "Retry-After"**

   If the HTTP 429 response includes a "Retry-After" header, wait the specified number of seconds before retrying.

**Implement Exponential Backoff**

   Use increasing delays between retry attempts (e.g., 10s, 30s, 60s) to reduce the load on the API.

**Use Batch Endpoints**

   Combine multiple requests into a single API call using batch endpoints to minimize the number of calls.

**Implement a Cache Layer**

   Cache frequently accessed data on the client side to reduce repetitive API requests and improve response times.