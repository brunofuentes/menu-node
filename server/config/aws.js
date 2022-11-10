const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports = {
	deleteImageS3: (item) => {
		if (process.env.STORAGE_TYPE === 's3' && item.imageUrl.includes('amazonaws')) {
			s3.deleteObject({
				Bucket: process.env.BUCKET_NAME,
				Key: item.imageUrl.split('amazonaws.com/')[1],
			})
				.promise()
				.then((res) => console.log('image deleted from S3'))
				.catch((err) => console.log('error deleting image from S3', err))
		} else {
			return console.log('no picture to be deleted from S3')
		}
	},
}
