if Rails.env.production?
  CarrierWave.configure do |config|
    config.fog_credentials = {
                 :provider => 'AWS',
        :aws_access_key_id => ENV['AWS_SHARE_PHOTOS_ID'],
    :aws_secret_access_key => ENV['AWS_SHARE_PHOTOS_SECRET'],
                   :region => 'us-east-1'
    }
    config.fog_directory = ENV['S3_BUCKET']
  end
end
