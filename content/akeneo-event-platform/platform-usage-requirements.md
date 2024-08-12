# Platform usage requirements


<i class="fa fa-check-square"></i> If you want to use a **Pub/Sub destination**, you need to grant the Akeneo Event Platform publishing access. Follow these steps:

1. In the Google Cloud Console, go to **Pub/Sub > Topics**.
2. Next to the topic you want to use, click **...** and then **View permissions**.
3. Click **ADD PRINCIPAL**.
4. Paste the following service account address into the **New principals** text box: `delivery-sa@akecld-prd-sdk-aep-prd.iam.gserviceaccount.com`.
5. In the Role drop-down list, select **Pub/Sub** and then **Pub/Sub Publisher**.
6. Click **Save**.

<i class="fa fa-check-square"></i> HTTP is not supported. Only **HTTPS** is allowed.

<i class="fa fa-check-square"></i> For HTTPS destinations, ensure your server returns an HTTP **200 status code** within **3 seconds** when receiving messages containing events. See <a href="/akeneo-event-platform/concepts.htm">the concept page</a> about the retry/revocation policy.

<i class="fa fa-check-square"></i> For a subscription to an HTTPS destination, the **URL must be valid** and return an HTTP **200 status code** after an **HTTP HEAD** request.

<i class="fa fa-check-square"></i> We do **not guarantee the order** in which events are delivered.

<i class="fa fa-check-square"></i> Events are delivered **at least once**. While we strive for reliability, duplicate events may occur, particularly in the case of retries. Ensure your system is idempotent to handle potential duplicates.

<i class="fa fa-check-square"></i> You can have up to **20 subscribers** for each PIM instance.

<i class="fa fa-check-square"></i> Each subscriber can have up to **20 subscriptions**.

