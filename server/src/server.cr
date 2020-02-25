require "kemal"

serve_static({"gzip" => false, "dir_listing" => false})

public_folder "./dist"

get "/" do |env|
  send_file env, "./index.html"
end

port = ENV["PORT"]? || 6969
Kemal.run port.to_i
