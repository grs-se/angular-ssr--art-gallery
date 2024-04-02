# Responsive Image Strategy:

1. setting css height in rem is still beneficial as it overides the fixed pixel html height attribute so that users can 'zoom in' or 'scale up' the image in case of accessibility requirements. However, the benefit of not doing this is that the developer can have a 'single source of truth'for declaring image sizes.
1.

## Image Height and Width

Can I do something build a function that retrieves the height and width properties which Cloudinary has calculated and stored in its API and then in admin panel of my site I could push those dimensions to each image id? Possible..I would also need to implement an on-upload dimensions calculator but this can come later. 

- What is the sequence of events here?
- The client sends a request
- The server returns a response
- Angular lifecycle hooks:
- OnCreate, OnViewLoaded, OnDestroy
- The data is fetched
- The browser
- Notes:
- I guess ideally, if my app were really sophisticated, the image dimensions would be saved into the DB,
- on create/update, and then the image dims could be referenced before rendering the view by the client.
- But perhaps this would lead to potential discrepencies between DB and actually returned image size
- Remember each artwork has one isMain image
- If I were to uset angular to calculate the image heights and widths I'd have to stall the loading
- of the images on the screen until the calculation had been made, but this might not be such an issue
- if lazy-loading is used: do this with conditionals in the view, i.e. \*ngIf="calculatedImgSize"
- One way to find out is to try the client-side approach first and see what obstacles I come up against.
- It is true that ...
- You can't use the load() event on the image element because you need to set this BEFORE load
- In some ways its more efficient to refer to the image ratio because it's fixed, rather than the height and width which can change.
- I think you may be approaching this the wrong way around:imgRef.nativeElement.clientHeight = artwork.image.height rather than...

## File Naming Convention

## Image Transformations

https://artlogic-res.cloudinary.com/w_750,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/browseanddarby/images/view/44dd53e3a7313fb525cf0790c3287463j/browse-darby-william-ratcliffe-still-life-with-fruit-a-plant-and-a-jug-on-a-table-circa-1932.jpg

- c_limit: Same as the fit mode but only if the original asset is larger than the specified limit (width and height), in which case the asset is scaled down so that it takes up as much space as possible within a bounding box defined by the specified width and height parameters. The original aspect ratio is retained (by default) and all of the original asset is visible. This mode doesn't scale up the asset if your requested dimensions are larger than the original image size.

In that case, then yes. Using f_auto and including an extension (e.g., ".jpg") will indeed deliver:

WebP (on Chrome/Opera/Android)
JPEG-XR (on IE/Edge)
and JPG all other browsers (e.g., FireFox, Safari).
Including q_50 will compress to 50% quality on all of these options (formats).

In addition, note that:

As you said, there are cases, like with illustrations, where PNG may be more optimal than JPG.
If the original image includes transparency, then you may want to deliver a PNG instead of a JPG (since JPG doesn't support transparency).
q_50 may look differently on the different formats and different images.
That's why using q_auto instead (including its different profiles) will answer all of these challenges. It'll automatically detect the cases where PNG may be more optimal than JPGs, it'll make sure that if the original image is transparent - we'll deliver a PNG, and JPG otherwise, and it'll make sure that the most optimal quality is defined, as it's detected for every image and every format individually.
