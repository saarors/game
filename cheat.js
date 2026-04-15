lua.doString(`
function autoShootEnemies()
  for i=#enemies,1,-1 do
    local e = enemies[i]

    table.insert(bullets, {
      x = player.x,
      y = player.y,
      dx = (e.x - player.x)/10,
      dy = (e.y - player.y)/10
    })
  end
end

old_update = update
function update()
  old_update()
  autoShootEnemies()
end
`)
