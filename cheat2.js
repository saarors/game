window.lua.doString(`
cheats = { god=false, autoShoot=false }

-- ===== logic =====
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

  if cheats.god then
    player.hp = 999999
  end

  if cheats.autoShoot then
    autoShootEnemies()
  end
end

-- ===== UI =====
menu = { x=20, y=80, w=180, h=160 }

function drawButton(text, x, y, w, h, active)
  if active then
    drawRect(x,y,w,h,"#2ecc71")
  else
    drawRect(x,y,w,h,"#444")
  end
  drawText(text, x+10, y+18)
end

function drawUI()
  drawRect(menu.x, menu.y, menu.w, menu.h, "rgba(0,0,0,0.7)")
  drawText("CHEAT MENU", menu.x+10, menu.y+20)

  drawButton("GOD MODE", menu.x+10, menu.y+40, 160, 30, cheats.god)
  drawButton("AUTO SHOOT", menu.x+10, menu.y+80, 160, 30, cheats.autoShoot)
end

old_draw = draw
function draw()
  old_draw()
  drawUI()
end

-- ===== CLICK SYSTEM =====
old_mouse = getMouse

function isInside(x,y,w,h,m)
  return m.x>=x and m.x<=x+w and m.y>=y and m.y<=y+h
end

old_update_click = update
function update()
  old_update_click()

  local m = getMouse()

  if m.down then
    -- GOD
    if isInside(menu.x+10, menu.y+40, 160, 30, m) then
      cheats.god = not cheats.god
    end

    -- AUTO SHOOT
    if isInside(menu.x+10, menu.y+80, 160, 30, m) then
      cheats.autoShoot = not cheats.autoShoot
    end


  end
end
`)
