# Common usage

## Get the status of job

You can retrieve the current status of your job by calling the job endpoint:
```
GET https://sdm.akeneo.cloud/api/v1/jobs/${job_id}/
```

The response contains the `status` key which can have several values:

- `running`: treatment in progress, try again in a few seconds
- `done`: the job is finished, you can download the result file
- `error`: an error occurred, look at the `message` key for more information
- `pending`: an action is expected on your side.

```
{
    "status": "running",
    "step": {
        "id": 1,
    }
}
```

## Retrieve the list of jobs

To retrieve the list of created jobs, simply execute a call on the following endpoint:
```
GET https://sdm.akeneo.cloud/api/v1/jobs/
```

:::info
This endpoint list all jobs created **in the organization**
:::

You can filter this list by adding parameters in the url. The available parameters are:

- `status` to filter on the job status (see above)
- `project` to filter on the project id
- `created_after` & `created before` : to filter by creation date, the date in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format

So, to retrieve all the completed jobs, created since 01-01-2022 on project 17, you need to make the following call:

```
GET https://sdm.akeneo.cloud/api/v1/jobs/?status=done&project=17&created_after=2022-01-01T00:00:00Z
```

The response is formatted as follows:
```python
{
	count: 100,
	results: [
		{
			id: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
			name: "Job 1",
			status: "done",
			creation_date	"2022-04-14T08:48:37.109159Z",
			completion_date	"2022-04-17T09:53:32.12Z"
		},
		...
	]
}
```

:::info
The answer is paginated, the default page size is 25. This pagination is controlled by the `page` and `page_size` parameters passed in the URL
:::

### Retrieve data in JSON format

To retrieve the data in JSON, you need to call the following endpoint

```python
GET https://sdm.akeneo.cloud/api/v1/jobs/${job_id}/data/${output_format_id}/
```

The result of the request will be
```python
[
	{
		col1: val1_1,
		col2: val2_1,
		...
	},
	...
]
```

With one object per line of the output dataset and each column as a key of the object. Empty columns are ignored.
