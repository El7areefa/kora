<template>
  <div>
    <h1>Users</h1>
    <Alert />

    <img src="@/assets/images/1.jpeg">
    <img src="@/assets/images/2.webp">
    <img src="@/assets/images/3.png">
    
    <Table type='bordered' showHover>
        <thead>
          <tr>
            <TableHead class='pl-2 w-[45%]' sticky>Name</TableHead>
            <TableHead class='pl-3 min-w-[26%]' sticky>Email</TableHead>
            <TableHead class='pl-3 min-w-[26%]' sticky>Phone</TableHead>
            <TableHead class='w-12' sticky>Website</TableHead>
          </tr>
        </thead>
        <tbody>
            <tr>
              <TableCell sticky>Name</TableCell>
              <TableCell sticky>Email</TableCell>
              <TableCell sticky>Phone</TableCell>
              <TableCell sticky>Website</TableCell>
            </tr>
        </tbody>
      </Table>
  </div>
</template>

<script setup lang="ts">


</script>
