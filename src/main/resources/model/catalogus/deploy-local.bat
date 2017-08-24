@echo off
type NUL > "../catalogus.trig"
cd system
for %%y in (*.trig) do (
	echo Processing %%y...
	type %%y >> "../../catalogus.trig"
	echo. >> "../../catalogus.trig"
)
cd ../backend
for %%y in (*.trig) do (
	echo Processing %%y...
	type %%y >> "../../catalogus.trig"
	echo. >> "../../catalogus.trig"
)
cd ../frontend
for %%y in (*.trig) do (
	echo Processing %%y...
	type %%y >> "../../catalogus.trig"
	echo. >> "../../catalogus.trig"
)
echo Whoohoo! All done!
pause
