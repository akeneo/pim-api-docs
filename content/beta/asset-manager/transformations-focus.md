# Focus on the transformations

For each [asset family](#the-asset-family), you can define transformations. They allow you to ask the PIM to automatically generate one or several new variations of a given media file for each asset belonging to your family.

Let's take an example to make it much clearer.

Say we have a `packshots` asset family. In its structure, it has 2 media file attributes:
- the `main_image` attribute in which is stored the main image of your packshot,
- the `thumbnail` attribute in which you want a smaller version of the main image, stored in `main_image`.

The PIM can automatically generate the thumbnail version of your main image for you, and this, thanks to the definition of a transformation!

![Asset transformation example](/img/beta/asset-transformation.svg)

For each transformation, we define:
- a media file attribute that will be used as the source for your transformation and wisely called *source* attribute: in our example, the `main_image` attribute,
- a media file attribute in which the generated file will be stored, called the *target* attribute: in our example, the `thumbnail` attribute,
- a set of ordered operations to perform on the source picture to generate the target one: in our example, a resizing.

::: info
You can have up to **10** different transformations for one given asset family and each transformation can perform several operations.
:::

The JSON format of the transformations is an array of transformations. A transformation is composed of several parts:
- a [label](#label), to name your transformation,
- a [filename part](#target-filename), 
- the [`source` part](#source-file),
- the [`target` part](#target-file),
- the [`operations` part](#transformation-operations).

```json
{
  "transformations": [
    {
      "label": "Your transformation label",
      "filename_prefix": "a_prefix",
      "filename_suffix": "a_suffix",
      "source": {...},
      "target": {...},
      "operations": [...]
    }
  ]
}
```

#### Examples
**With one transformation**
```json
{
  "transformations": [
    {
      "label": "Thumbnail generation",
      "filename_suffix": "_thumbnail",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

**With two transformations**
```json

{
  "transformations": [
    {
      "label": "Resize ecommerce",
      "filename_prefix": "ecom_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "variations",
        "channel": "ecommerce",
        "locale": null
      },
      "operations": [{
        "type": "scale",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Resize print",
      "filename_prefix": "print_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "variations",
        "channel": "print",
        "locale": null
      },
      "operations": [{
        "type": "scale",
        "parameters": {
          "width": 2500,
          "height": 2500
        }
      }]
    }
  ]
}
```

Still not comfortable with transformations? Don't hesitate to go through the next sections where we detail each part of the transformation format.

## Label

It's just a string and it's basically the name you want to give to your transformation.  
It will be used in error messages whenever your transformation failed to generate your variations.

## Source file

The `source` property allows you to define in which attribute value is stored the media file you want to use as the source file for your transformation.

It follows this format:
```json
{
  "source": {
    "attribute": MEDIA_FILE_ATTRIBUTE_NAME,
    "locale": SOURCE_LOCALE_CODE,
    "channel": SOURCE_CHANNEL_CODE
  },...
}
```

In this formula:
 - `MEDIA_FILE_ATTRIBUTE_NAME` is the code of the asset attribute that holds the source file. This asset attribute should be defined in the asset family and of type `media_file`.
 - `SOURCE_LOCALE_CODE` is an existing locale code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a localizable asset attribute.
 - `SOURCE_CHANNEL_CODE` is an existing channel code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a scopable asset attribute.

::: warning
The `attribute`, `locale` and `channel` properties are mandatory. 
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not localizable, the `locale` property should be set to `null`.  
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not scopable, the `channel` property should be set to `null`. 
:::

::: info
There are additional business rules regarding this `target` property whenever you have multiple transformations for the same asset family. See the [Dealing with several transformations](#dealing-with-several-transformations) section for more details.
:::

## Target file

The `target` property allows you to define in which attribute value the PIM should generate the new variation.

It follows this format:
```json
{
  "target": {
    "attribute": MEDIA_FILE_ATTRIBUTE_NAME,
    "locale": TARGET_LOCALE_CODE,
    "channel": TARGET_CHANNEL_CODE
  },...
}
```

In this formula:
 - `MEDIA_FILE_ATTRIBUTE_NAME` is the code of the asset attribute that holds the target file. This asset attribute should be defined in the asset family and of type `media_file`.
 - `TARGET_LOCALE_CODE` is an existing locale code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a localizable asset attribute.
 - `TARGET_CHANNEL_CODE` is an existing channel code when `MEDIA_FILE_ATTRIBUTE_NAME` is the code of a scopable asset attribute.

::: warning
The `attribute`, `locale` and `channel` properties are mandatory. 
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not localizable, the `locale` property should be set to `null`.  
If the `MEDIA_FILE_ATTRIBUTE_NAME` is the code of an attribute that is not scopable, the `channel` property should be set to `null`. 
:::

::: info
There are additionnal business rules regarding this `target` property whenever you have multiple transformations for the same asset family. See the [Dealing with several transformations](#dealing-with-several-transformations) section for more details.
:::

## Target filename

You can give a name to the generated target file. By default, the naming is based on the filename of the source file. You can define a suffix and/or a prefix that will be concatenated to this filename and be used as the filename of the target file. 

To do this, use:
- the `filename_prefix` property, the string that will be prepend to the source filename.
- the `filename_suffix` property, the string that will be append to the source filename.

You can use both properties if you want to suffix and prefix the source filename.

::: warning
You need to define at least either a suffix or a prefix, as the target filename can't be the same as the source filename.
:::

::: info
Suffix and prefix can only contain alphanumeric characters and the following characters: `_`, `-`, `.` and space.
:::

Let's take an example to make this much clearer. Let's say you have a file named `amor_red_model_picture.jpg`. You want to generate a thumbnail version of this file and you want the new generated file to be named `amor_red_model_picture_160x160.jpg`. Then, use the following properties in your transformation for the generated file to be named properly.
```json
{
  ...,
  "filename_prefix": null,
  "filename_suffix": "_160x160",
  ...
}
```

## Transformation operations

The `operations` property allows you to define which image transformations should be applied to your source file to generate the target file.

In one single transformation, you can define one or several operations.

In the case you have several operations for the same asset family, note that they will be performed in the same order than they are defined in the `operations` array. So be sure to choose the right order for what you wish to accomplish.

::: warning
Defining the same operation type twice in the same transformation is forbidden as it would totally make no sense.
:::

The `operations` property follows this format:
```json
{
  "operations": [{
      "type": OPERATION_NAME,
      "parameters": OPERATION_PARAMETERS,
    },...
  ]
}
```

In this formula:
 - `OPERATION_NAME` is the name of the operation that should be perfomed on the source file. The complete list of available operations is detailed below.
 - `OPERATION_PARAMETERS` is the set of parameters for the operation. It depends on the `OPERATION_NAME` chosen before.

::: warning
The `type` and `parameters` properties are mandatory.
:::

Let's now detail the available operation names as well as their corresponding parameters.

### Thumbnail

With the `thumbnail` type, you can automatically generate a thumbnail. It keeps the image proportions and crops it if needed.

There are 2 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `width` <br> _integer > 0_ | The width of the generated thumbnail in pixels |
| `height` <br> _integer > 0_ | The height of the generated thumbnail in pixels |

::: info
Both parameters are required.
:::

### Scale

With the `scale` type, you can resize image while keeping the width/height proportions.

There are 3 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `width` <br>_integer > 0_ | The new width of the image in pixels |
| `height` <br>_integer > 0_ | The new height of the image in pixels |
| `ratio` <br>_integer > 0_ | The ratio (in %) for the image resizing. If defined, this parameter will take priority over the 2 other parameters.|

::: info
There should be at least one of the 3 parameters defined.
:::

### Change of colorspace

With the `colorspace` type, you can change the image's colorspace. For example, you can turn it to black and white.

There is one available parameter for this operation: `colorspace`. It allows you to choose to which colorspace you want your image to be turned into. It should be one of the following values:
- `rgb`, 
- `cmyk`,
- `grey`.

::: info
The `colorspace` parameter is required.
:::

### Resolution

With the `resolution` type, you can change the image resolution.

There are 3 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `resolution-x` <br>_integer > 0_ | The new horizontal resolution |
| `resolution-y` <br>_integer > 0_ | The new vertical resolution |
| `resolution-unit` <br>_string, either "ppi" or "ppc"_ | The unit in which the `resolution-x` and `resolution-y` properties were given |

::: info
All parameters are required.
:::

### Resize

With the `resize` type, you can resize image without keeping the width/height proportions.

There are 2 available parameters for this operation.

| Operator name & format | Description |
| ----------------- | -------------- |
| `width` <br>_integer > 0_ | The new width of the image in pixels |
| `height` <br>_integer > 0_ | The new height of the image in pixels |

::: info
Both parameters are required.
:::

## Dealing with several transformations

As stated before, you can define up to 10 transformations by asset family. So in the case, you need several transformations for one given family, you will need to observe some business rules.

### Unicity of the target value 
In the same asset family, you cannot have two transformations with the same target, i.e. exactly the same `attribute`, `channel` and `locale` in your `target` property. 

Otherwise, your first generated target file may be erased by the next transformation.

#### Example
This example will generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image_2",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

### Non-unicity of the source value
 
In the same asset family, you can have two transformations with the same source, i.e. exactly the same `attribute`, `channel` and `locale` in your `source` property. 

Indeed, it allows you generate different versions of your source file.

#### Example
This example is completely valid - even if in this case we create twice exactly the same image in two different attributes, A bit useless if you ask, but still, it's valid. :wink:
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail_2",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

### Unicity of the target filename
In the same asset family, you cannot have two transformations with the same target filename, i.e. exactly the same `source`, `filename_prefix` and `filename_suffix`.

Otherwise, the PIM would create two files called exactly the same way, which can cause you trouble if you want to retrieve them.

#### Example
This example will generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "thumbnail_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "thumbnail_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail_2",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

### A source value cannot be a target value

In the same asset family, you cannot have two transformations with the first one defining a source value as the target value of the second one. And vice versa.

#### Examples
This example will generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail_2",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

This other example will also generate an error.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image_2",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "main_image",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```

But *NOT* this one. Because the source attribute value of the first transformation is different from the target attribute value of the second transformation, as they are referencing different channels.
```json
{
  "transformations": [
    {
      "label": "Transformation 1",
      "filename_prefix": "t1_",
      "source": {
        "attribute": "main_image",
        "channel": "ecommerce",
        "locale": null
      },
      "target": {
        "attribute": "thumbnail",
        "channel": null,
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    },
    {
      "label": "Transformation 2",
      "filename_prefix": "t2_",
      "source": {
        "attribute": "main_image_2",
        "channel": null,
        "locale": null
      },
      "target": {
        "attribute": "main_image",
        "channel": "print",
        "locale": null
      },
      "operations": [{
        "type": "thumbnail",
        "parameters": {
          "width": 150,
          "height": 150
        }
      }]
    }
  ]
}
```
