json.array!(@games) do |game|
  json.extract! game, :id, :score, :level, :user_id
  json.url game_url(game, format: :json)
end
