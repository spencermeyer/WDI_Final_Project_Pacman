# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Game.create(score:1000, level:1, user_id:1);
Game.create(score:999, level:1, user_id:1);
Game.create(score:888, level:1, user_id:1);
Game.create(score:777, level:1, user_id:2);

User.create(email:"a@a.com", password:"password");
User.create(email:"b@b.com", password:"password");
User.create(email:"c@c.com", password:"password");



